import { combineReducers } from "redux";
import auth from "./auth_reducer";
import jobs from "./jobs_reducer";
import region from "./region_reducer";
import likedJobs from "./likes_reducer";
import searchError from "./error_reducer";
import noListing from "./nolisting_reducer";

export default combineReducers({
  auth,
  jobs,
  region,
  likedJobs,
  searchError,
  noListing,
});
