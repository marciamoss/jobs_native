import React, { Component } from "react";
import _ from "lodash";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Slides = ({ data, onComplete }) => {
  const renderLastSlide = (index) => {
    if (index === data.length - 1) {
      return (
        <Button
          title="Onwards!"
          raised={true}
          buttonStyle={styles.buttonStyle}
          onPress={onComplete}
        />
      );
    }
  };
  const renderSlides = () =>
    data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
        >
          <Text
            style={[
              styles.textStyle,
              { marginBottom: index === data.length - 1 ? 15 : 0 },
            ]}
          >
            {slide.text}
          </Text>
          {renderLastSlide(index)}
        </View>
      );
    });

  return (
    <ScrollView
      horizontal
      pagingEnabled
      contentContainerStyle={styles.scrollView}
    >
      {renderSlides()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  textStyle: {
    fontSize: 30,
    color: "white",
    padding: 4,
    textAlign: "center",
  },
  scrollView: {
    height: SCREEN_HEIGHT,
  },
  buttonStyle: {
    backgroundColor: "#0288d1",
  },
});

export default Slides;
