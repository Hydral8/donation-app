import React from "react";
import { View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import FontText from "../FontText/FontText";

function Divider({ segmentWidth, showText, color }) {
  if (!color) {
    color = "#eeeeee";
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          height: 1,
          backgroundColor: color,
          width: segmentWidth
        }}
      />
      {showText && (
        <FontText
          style={{
            fontFamily: "myriad-pro-bold",
            fontSize: hp("1.8%"),
            paddingHorizontal: "5%",
            color: "#848487"
          }}
        >
          or
        </FontText>
      )}
      <View
        style={{
          height: 1,
          backgroundColor: color,
          width: segmentWidth
        }}
      />
    </View>
  );
}

export default Divider;
