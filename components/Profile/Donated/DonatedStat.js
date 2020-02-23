import React from "react";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import FontText from "../../FontText/FontText";

function DonatedStat({ stat, value }) {
  return (
    <View
      style={{
        width: "40%",
        alignItems: "center"
      }}
    >
      <FontText
        style={{
          color: "#848487",
          fontFamily: "myriad-pro-reg",
          paddingBottom: "20%"
        }}
      >
        {stat}
      </FontText>
      <FontText
        style={{
          fontSize: hp("2.5%"),
          fontFamily: "myriad-pro-reg"
        }}
      >
        {value + "$"}
      </FontText>
    </View>
  );
}
export default DonatedStat;
