import React from "react";
import { View, StyleSheet } from "react-native";
import FontText from "../FontText/FontText";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function Quote({ style }) {
  return (
    <View
      style={[
        style,
        {
          alignItems: "center"
        }
      ]}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "80%",
          alignItems: "center"
        }}
      >
        <FontText style={[styles.quoteMark, { alignSelf: "flex-start" }]}>
          &ldquo;
        </FontText>
        <FontText
          style={{
            fontFamily: "noto-sans-reg",
            color: "white",
            width: "85%",
            fontSize: hp("2.0%")
          }}
        >
          You have not lived today until you have done something for someone who
          can never repay you.
        </FontText>
        <FontText style={styles.quoteMark}>&rdquo;</FontText>
      </View>
      <FontText
        style={{
          color: "white",
          fontFamily: "noto-sans-bold",
          fontSize: hp("2.3%"),
          width: "80%",
          textAlign: "right"
        }}
      >
        John Bunyan
      </FontText>
    </View>
  );
}

const styles = StyleSheet.create({
  quoteMark: {
    fontFamily: "noto-sans-reg",
    color: "white",
    fontSize: hp("5%"),
    alignSelf: "flex-end",
    height: hp("5%")
  }
});

export default Quote;
