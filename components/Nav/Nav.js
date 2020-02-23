import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import History from "../../modules/History";
import { useSafeArea } from "react-native-safe-area-context";
import LinearGradient from "../LinearGradient/LinearGradient";

function Nav({ mode, selected }) {
  const atHome = /^\/$/.test(History.location.pathname);
  const atProfile = /\/profile/.test(History.location.pathname);
  // let [icons] = React.useState(["activity", "plus-circle", "user"]);
  const insets = useSafeArea();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: !mode ? "absolute" : "relative",
        bottom: 0,
        width: !mode ? "100%" : "57%",
        height: !mode ? hp("7.8%") : null,
        backgroundColor: "blue",
        backgroundColor: !mode ? "white" : "transparent"
      }}
    >
      {!mode && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "#eeeeee",
            width: wp("24%"),
            height: wp("24%"),
            borderRadius: wp("12%"),
            left: wp("38%"),
            bottom: hp("3%"),
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              width: wp("18.7%"),
              height: wp("18.7%"),
              borderRadius: wp("9.35%"),
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              shadowOffset: { height: hp("0.7%"), width: wp("0.35%") }, //IOS
              shadowOpacity: 0.2, //IOS
              shadowRadius: hp("0.7%"), //IOS
              elevation: 2
            }}
          >
            <TouchableOpacity onPress={() => History.push("/donate")}>
              <LinearGradient
                colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
                angle={120}
                style={{
                  width: wp("15.8%"),
                  borderRadius: wp("7.9%"),
                  height: wp("15.8%"),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    // width: wp("7%"),
                    height: hp("2.7%"),
                    resizeMode: "contain"
                  }}
                  source={require("../../assets/icon-gift.png")}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          width: !mode ? "65%" : "100%",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <TouchableOpacity disabled={atHome} onPress={() => History.push("/")}>
          <Image
            style={{
              // width: wp("7%"),
              height: hp("2.7%"),
              resizeMode: "contain"
            }}
            source={
              atHome
                ? require("../../assets/icon-list-on.png")
                : !mode
                ? require("../../assets/icon-list.png")
                : require("../../assets/icon-list-white.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => History.push("/profile")}
          disabled={atProfile}
        >
          <Image
            style={{
              // width: wp("7%"),
              height: hp("2.7%"),
              resizeMode: "contain"
            }}
            source={
              atProfile
                ? require("../../assets/icon-heart-on.png")
                : !mode
                ? require("../../assets/icon-heart.png")
                : require("../../assets/icon-heart-white.png")
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Nav: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-around",
  //   position: "absolute",
  //   bottom: 0,
  //   paddingBottom: insets.bottom,
  //   width: "100%",
  //   height: hp("7.84%"),
  //   backgroundColor: "white"
  // }
});

export default Nav;
