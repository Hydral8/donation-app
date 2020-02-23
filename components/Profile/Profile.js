import React from "react";
import { View } from "react-native";
import Settings from "../Settings/Settings";
import Nav from "../Nav/Nav";
import ProfileInfo from "./ProfileInfo";
import { auth } from "../../firebase/firebase";
import LinearGradient from "../LinearGradient/LinearGradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { FullScreenWidth } from "../../modules/FullScreen";

const user = auth.currentUser;

function Profile() {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center"
      }}
    >
      <LinearGradient
        colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
        angle={120}
        style={{
          width: FullScreenWidth,
          height: hp("37%"),
          position: "absolute"
        }}
      />
      <View
        style={{
          //to force photo overlap make top equal to lineargradient height - the photo radius
          top: hp("19.47%"),
          height: "65%",
          width: "94.2%",
          // backgroundColor: "red",
          justifyContent: "space-between"
        }}
      >
        <ProfileInfo />
        <Settings />
      </View>
      <Nav />
    </View>
  );
}

export default Profile;
