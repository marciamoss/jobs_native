import AsyncStorage from "@react-native-async-storage/async-storage";
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "./types";

export const facebookLogin =
  ({ promptAsync }) =>
  async (dispatch) => {
    let token = await AsyncStorage.getItem("fb_token");
    if (token) {
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
      doFacebookLogin(dispatch, promptAsync);
    }
  };
const doFacebookLogin = async (dispatch, promptAsync) => {
  const result = await promptAsync();
  if (result.type !== "success") {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  let token = result.authentication.accessToken;
  await AsyncStorage.setItem("fb_token", token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
