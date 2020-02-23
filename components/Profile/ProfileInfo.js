import React from "react";
import { Image, View, Text } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import ProfilePic from "./ProfilePic";
import Donated from "./Donated/Donated";
import Divider from "../Divider/Divider";
import FontText from "../FontText/FontText";
import { auth } from "../../firebase/firebase";

function ProfileInfo({ style }) {
  const user = auth.currentUser;
  let viewWidth;
  if (!style) {
    viewWidth = wp("94.2%");
  } else {
    if (typeof style.width === "string") {
      viewWidth = wp(style.width);
    }
    viewWidth = style.width;
  }
  return (
    <View
      style={[
        style,
        {
          width: "100%",
          borderRadius: viewWidth * 0.08,
          height: "55%",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "flex-start"
        }
      ]}
    >
      <View
        style={{
          height: viewWidth / 6
        }}
      >
        <ProfilePic
          uri={
            user.photoURL
              ? user.photoURL
              : "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
          }
          photoSize={viewWidth / 3}
          style={{ top: -viewWidth / 6 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        <FontText style={{ fontSize: hp("2.8%") }}>{user.displayName}</FontText>
        <Divider segmentWidth={"41.3%"} />
        <FontText
          style={{ fontSize: hp("2.1%"), fontFamily: "myriad-pro-reg" }}
        >
          My Donations
        </FontText>
        <Donated />
      </View>
    </View>
  );
}

export default ProfileInfo;
