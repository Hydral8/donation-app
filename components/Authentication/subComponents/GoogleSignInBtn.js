import React from "react";
import { TouchableOpacity, Image } from "react-native";
import FontText from "../../FontText/FontText";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { googleSignIn } from "../../../modules/oAuth/oAuthProviders";

function GoogleSignInBtn({ style, mode }) {
  return (
    <TouchableOpacity style={style} onPress={googleSignIn}>
      <Image
        style={{
          width: wp("8%"),
          // height: wp("5%"),
          resizeMode: "contain"
        }}
        source={require("../../../assets/icon-google.png")}
      />
      <FontText
        style={{
          fontFamily: "myriad-pro-bold",
          paddingLeft: "5%",
          fontSize: hp("1.8%")
        }}
      >
        {mode === "signup" ? "Sign Up with Google" : "Sign In With Google"}
      </FontText>
    </TouchableOpacity>
  );
}

export default GoogleSignInBtn;
