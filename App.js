import React, { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Provider } from "react-redux";
import { Alert, Platform } from "react-native";
import store from "./store";
import Home from "./routes/Home";
import registerForNotifications from "./services/push_notifications";

const App = () => {
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        let text = "";
        if (Platform.OS === "android") {
          const {
            request: {
              trigger: {
                remoteMessage: {
                  data: { title, message },
                },
              },
            },
          } = notification;
          text = `Title: ${title} Message: ${message}`;
        }
        if (Platform.OS === "ios") {
          const {
            request: {
              trigger: {
                payload: {
                  aps: {
                    alert: { title, body },
                  },
                },
              },
            },
          } = notification;
          text = `Title: ${title} Message: ${body}`;
        }

        Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response", JSON.stringify(response));
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
