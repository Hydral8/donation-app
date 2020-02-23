import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import History from "../../modules/History";
import { auth } from "../../firebase/firebase";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { FullScreenWidth } from "../../modules/FullScreen";
import Divider from "../Divider/Divider";

const settings = [
  { type: "Account", to: "/accountSettings" },
  { type: "Activity", to: "/activitySettings" },
  { type: "Language", to: "/languagePicker" },
  { type: "Log Out", to: "/signin" }
];
function Settings({ style }) {
  let settingsWidth;
  if (!style) {
    settingsWidth = wp("94.2%");
  } else {
    if (typeof style.width === "string") {
      settingsWidth = wp(style.width);
    }
    settingsWidth = style.width;
  }
  return (
    //94.2 is width of view in relation to fullscreenwidth,}]}
    <View
      style={[style, styles.Settings, { borderRadius: wp("94.2%") * 0.08 }]}
    >
      {settings.map(v => (
        <View key={v.type}>
          <TouchableOpacity
            style={styles.SettingsBtn}
            onPress={() =>
              v.type === "Log Out"
                ? auth.signOut() && History.push("/signin")
                : History.push(History.location.pathname + v.to)
            }
          >
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: "2%"
                // backgroundColor: "pink"
              }}
            >
              <Text
                style={{
                  fontSize: hp("2.5%"),
                  color: v.type === "Log Out" ? "red" : "black"
                }}
              >
                {v.type}
              </Text>
              <Icon
                type="ionicon"
                name="ios-arrow-forward"
                size={hp("2.5%")}
                iconStyle={
                  {
                    // position: "absolute",
                    // right: 10
                  }
                }
                color="gray"
              />
            </View>
          </TouchableOpacity>
          {v.type !== "Log Out" && <Divider segmentWidth={"50%"} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  Settings: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    justifyContent: "center"
  },

  SettingsBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  }
});

export default Settings;
