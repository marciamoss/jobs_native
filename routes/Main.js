import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";
import MapScreen from "../screens/MapScreen";
import DeckScreen from "../screens/DeckScreen";
import Review from "./Review";

const Main = ({ jobs, likedJobs }) => {
  const Tab = createBottomTabNavigator();
  /**        icon={{ name: "delete-forever", color: "white", size: 35 }} */
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="my-location" size={30}></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="Deck"
        component={DeckScreen}
        listeners={{
          tabPress: (e) => (jobs.length === 0 ? e.preventDefault() : ""),
        }}
        options={{
          headerShown: false,
          title: "Jobs",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="description" size={30}></Icon>
          ),
        }}
      />

      <Tab.Screen
        name="Review Jobs"
        component={Review}
        listeners={{
          tabPress: (e) => (likedJobs.length === 0 ? e.preventDefault() : ""),
        }}
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="favorite" size={30}></Icon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  return { jobs: state.jobs, likedJobs: state.likedJobs };
};
export default connect(mapStateToProps, actions)(Main);
