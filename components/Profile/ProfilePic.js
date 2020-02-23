import React from "react";
import { Image } from "react-native-expo-image-cache";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

function ProfilePic({ uri, photoSize, style }) {
  return (
    <Image
      uri={uri}
      style={[
        style,
        {
          width: photoSize,
          height: photoSize,
          borderRadius: photoSize / 2,
          elevation: 2, // android
          shadowColor: "rgba(0,0,0, .4)", //IOS
          shadowOffset: { height: hp("1.0%"), width: wp("0.5%") }, //IOS
          shadowOpacity: 0.75, //IOS
          shadowRadius: hp("1.0%"), //IOS
          elevation: 4
        }
      ]}
    />
  );
}

export default ProfilePic;
