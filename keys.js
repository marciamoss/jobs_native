import {
  JOB_ROOT_URL,
  JOB_API_KEY,
  JOB_ENGINE,
  MAP_API_KEY,
  JOB_DETAILS_ENGINE,
} from "@env";

exports.JOB = {
  url: JOB_ROOT_URL,
};

exports.JOBDETAILS = {
  jde: JOB_DETAILS_ENGINE,
};

exports.JOB_QUERY_PARAMS = {
  api_key: JOB_API_KEY,
  engine: JOB_ENGINE,
  q: "jobs",
  lrad: 10,
};

exports.SEARCH = {
  api_key: JOB_API_KEY,
};

exports.GMAP = {
  api_key: MAP_API_KEY,
};
