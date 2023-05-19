import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";

const PUSH_ENDPOINT = "https://books-rtk-mongo.vercel.app/api/tokens/save";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const registerForNotifications = async () => {
  let previousToken = await AsyncStorage.getItem("pushtoken");
  console.log({ previousToken });
  if (Device.isDevice) {
    if (previousToken) {
      return;
    } else {
      let status = "";
      let permissionStatus = await Notifications.getPermissionsAsync();
      status = permissionStatus.status;
      if (status === "undetermined") {
        permissionStatus = await Notifications.requestPermissionsAsync();
        status = permissionStatus.status;
      }

      if (status !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync({
        projectId: "f9627288-3a60-4ae0-bff9-05a4f5618303",
      });
      try {
        await axios.post(PUSH_ENDPOINT, { token: { token: token.data } });
        AsyncStorage.setItem("pushtoken", token.data);
      } catch (error) {
        console.log("error", error);
      }
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }
};
export default registerForNotifications;
