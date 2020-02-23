import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import History from "../../modules/History";
import { Icon } from "react-native-elements";
import baseStyles from "../../modules/Styles";
import LinearGradient from "../LinearGradient/LinearGradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useSafeArea } from "react-native-safe-area-context";

function SettingsHeader({
  title,
  colors,
  action,
  mode,
  hasBackground,
  noButton
}) {
  const bgColor = hasBackground || !mode ? "white" : "#19a3f4";
  const color = hasBackground || !mode ? "#19a3f4" : "white";
  const insets = useSafeArea();
  return (
    <LinearGradient
      colors={
        !mode
          ? colors
            ? colors
            : ["white", "white"]
          : ["transparent", "transparent"]
      }
      angle={120}
      style={baseStyles.Header}
    >
      <View
        style={{
          top: insets.top ? insets.top - 7.5 : 0,
          width: "94.2%",
          height: hp("11.6%") - insets.top,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {!noButton && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              position: "absolute",
              left: 0,
              width: "25%",
              height: "80%",
              borderRadius: wp("8%"),
              backgroundColor: bgColor,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={action}
          >
            <Icon
              type="ionicon"
              name="ios-arrow-back"
              size={hp("3.5%")}
              color={color}
              iconStyle={{ height: hp("3.695%"), paddingRight: "5%" }}
            />
            <Text style={{ color }}>Done</Text>
          </TouchableOpacity>
        )}
        <Text style={{ color: bgColor }}>{title}</Text>
      </View>
    </LinearGradient>
  );
}

export default SettingsHeader;
