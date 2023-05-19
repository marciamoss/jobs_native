import axios from "axios";
import _ from "lodash";
import {
  FETCH_JOBS,
  SET_REGION,
  LIKE_JOB,
  CLEAR_LIKED_JOBS,
  SET_ERROR,
  RESET_ERROR,
  NO_JOBS,
  RESET_NO_JOBS,
} from "./types";
import reverseGeocode from "latlng-to-zip";
import qs from "qs";
const keys = require("../keys.js");

const buildJobsUrl = (zip, jobTitle, st) => {
  if (jobTitle) {
    keys.JOB_QUERY_PARAMS.q = jobTitle;
  }
  const query = qs.stringify({
    ...keys.JOB_QUERY_PARAMS,
    location: zip,
  });
  return `${keys.JOB.url}${query}`;
};

export const setRegion = (region) => (dispatch) => {
  dispatch({ type: SET_REGION, payload: region });
};

export const resetError = () => (dispatch) => {
  dispatch({ type: RESET_ERROR });
};

export const resetNoListing = () => (dispatch) => {
  dispatch({ type: RESET_NO_JOBS });
};

export const fetchJobs = (region, jobTitle, callback) => async (dispatch) => {
  try {
    let zip = await reverseGeocode(
      { latitude: region.latitude, longitude: region.longitude },
      keys.GMAP.api_key
    );
    const url = buildJobsUrl(zip, jobTitle, 0);
    let results = await axios.get(url);

    if (results && results?.data && results?.data?.jobs_results) {
      dispatch({ type: FETCH_JOBS, payload: results?.data?.jobs_results });
      if (results?.data?.jobs_results.length === 0) {
        dispatch({ type: NO_JOBS });
      } else {
        callback();
      }
    } else {
      dispatch({ type: NO_JOBS });
      dispatch({ type: FETCH_JOBS, payload: [] });
    }
  } catch (e) {
    dispatch({ type: SET_ERROR });
  }
};

export const likeJob = (job) => async (dispatch) => {
  let apply_options = [];
  let apply = await axios.get(
    `${keys.JOB.url}engine=${keys.JOBDETAILS.jde}&q=${job.job_id}&api_key=${keys.SEARCH.api_key}`
  );
  apply_options = _.uniqBy(apply?.data?.apply_options, "link");
  job = { ...job, apply_options };
  dispatch({ type: LIKE_JOB, payload: job });
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
