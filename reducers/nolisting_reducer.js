import { NO_JOBS, RESET_NO_JOBS } from "../actions/types";

export default function (state = false, action) {
  switch (action.type) {
    case NO_JOBS:
      return true;
    case RESET_NO_JOBS:
      return false;
    default:
      return state;
  }
}
