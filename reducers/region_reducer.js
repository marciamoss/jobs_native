import { SET_REGION } from "../actions/types";

const INITIAL_STATE = {
  longitude: -122,
  latitude: 37,
  longitudeDelta: 0.04,
  latitudeDelta: 0.09,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_REGION:
      return action.payload;
    default:
      return state;
  }
}
