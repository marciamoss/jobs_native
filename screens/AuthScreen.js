import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { connect } from "react-redux";
import * as actions from "../actions";
WebBrowser.maybeCompleteAuthSession();
const AuthScreen = ({ facebookLogin, token, navigation }) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "1235433870700916",
  });

  useEffect(() => {
    if (token) {
      navigation.navigate("Main", { screen: "Map" });
    }
  }, [token]);

  useEffect(() => {
    if (request) {
      facebookLogin({ promptAsync, response });
    }
  }, [request]);

  const Profile = ({ user }) => {
    return (
      <View>
        <Image source={{ uri: user.picture.data.url }} style={styles.image} />
        <Text style={styles.name}>{user.name}</Text>
        <Text>Id: {user.id}</Text>
      </View>
    );
  };
  return <View />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

function mapStateToProps({ auth }) {
  return { token: auth.token };
}
export default connect(mapStateToProps, actions)(AuthScreen);
