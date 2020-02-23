import React from "react";
import { View, TextInput } from "react-native";
import FontText from "../FontText/FontText";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import baseStyles from "../../modules/Styles";

function DonationDetail({ type, action }) {
  return (
    <View
      style={{
        width: "86.25%",
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor: "yellow"
      }}
    >
      <FontText
        style={{
          position: "absolute",
          fontFamily: "myriad-pro-reg",
          color: "#848487",
          left: 0,
          top: "-50%"
        }}
      >
        {type}
      </FontText>
      <TextInput
        keyboardType={type === "Value" ? "numeric" : "default"}
        onChangeText={text => action(text)}
        style={[
          baseStyles.AuthInput,
          { width: "100%", borderRadius: wp("4.06") }
        ]}
      />
    </View>
  );
}

export default DonationDetail;
