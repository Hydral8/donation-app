import React from "react";
import LinearGradient from "../LinearGradient/LinearGradient";
import FontText from "../FontText/FontText";
import { TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

function LinearGradButton({ action, title }) {
  return (
    <TouchableOpacity onPress={action}>
      <LinearGradient
        colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
        angle={120}
        style={{
          width: wp("81.25%"),
          height: hp("6.5%"),
          borderRadius: wp("4.06%"),
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <FontText
          style={{
            fontFamily: "myriad-pro-bold",
            color: "white"
          }}
        >
          {title}
        </FontText>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default LinearGradButton;
