import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image, CacheManager } from "react-native-expo-image-cache";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import FontText from "../FontText/FontText";

const size = wp("35%");

function Donation({
  profilePic,
  displayName,
  uri,
  preview,
  time,
  type,
  value
}) {
  console.log(wp("100%"));
  return (
    <View style={styles.Donation}>
      <Image
        options={{ md5: true }}
        style={{
          width: size,
          height: size,
          borderRadius: wp("6.5%"),
          zIndex: 0,
          resizeMode: "stretch"
        }}
        preview={{ source: preview }}
        uri={uri}
        // tint={"dark"}
      />
      <View
        style={{
          flex: 1,
          height: "100%",
          alignItems: "center",
          justifyContent: "space-around",
          zIndex: 1
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Image
            {...{
              uri:
                profilePic ||
                "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
            }}
            style={{
              width: wp("13.3%"),
              height: wp("13.3%"),
              borderRadius: wp("13.3%") / 2
            }}
          />
          <View
            style={{
              alignItems: "flex-start",
              paddingLeft: "5.56%"
            }}
          >
            <FontText
              style={{ fontFamily: "myriad-pro-bold", fontSize: hp("2.0%") }}
            >
              {displayName}
            </FontText>
            <Text style={{ fontSize: 10, color: "gray" }}>{time}</Text>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <FontText
            style={{ fontFamily: "myriad-pro-reg", fontSize: hp("2.2%") }}
          >
            {type}
          </FontText>
          <FontText
            style={{ fontFamily: "myriad-pro-reg", fontSize: hp("2.5%") }}
          >
            {value + "$"}
          </FontText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Donation: {
    flexDirection: "row",
    width: "94.2%",
    height: size,
    alignSelf: "center",
    backgroundColor: "lightblue",
    borderRadius: wp("6.5%"),
    alignItems: "center",
    marginBottom: 20
  },
  DonationHeader: {
    width: "100%"
  }
});

export default Donation;
