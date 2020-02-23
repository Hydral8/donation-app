import React from "react";
import { View, FlatList } from "react-native";
import LanguageChoice from "./LanguageChoice";
import SettingsHeader from "../SettingsHeader";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Divider from "../../Divider/Divider";
import Nav from "../../Nav/Nav";
import { FullScreenWidth, FullScreenHeight } from "../../../modules/FullScreen";
import History from "../../../modules/History";

const languages = [
  "English",
  "French",
  "Italian",
  "German",
  "Korean",
  "Chinese",
  "Japanese",
  "Russian",
  "English",
  "French",
  "Italian",
  "German",
  "Korean",
  "Chinese",
  "Japanese",
  "Russian",
  "German",
  "Korean",
  "Chinese",
  "Japanese",
  "Russian"
].sort((a, b) => a.localeCompare(b));

const DATA = languages.map(
  (v, i) => new Object({ key: i + 1 + "", language: v })
);

function LanguagePicker() {
  console.log(FullScreenWidth + " " + FullScreenHeight);
  return (
    <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
      <SettingsHeader
        title="Languages"
        colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
        action={() => History.goBack()}
      />
      <View
        style={{
          width: "94.2%",
          height: DATA.length > 16 ? hp("86.4%") : null,
          marginTop: hp("2%"),
          backgroundColor: "white",
          borderRadius: wp("5%"),
          alignItems: "center"
        }}
      >
        <FlatList
          style={{
            marginVertical: hp("2%"),
            width: "100%",
            borderRadius: wp("5%")
            // backgroundColor: "red"
          }}
          data={DATA}
          renderItem={({ item }) => (
            <View>
              <LanguageChoice
                language={item.language}
                id={item.key}
                length={DATA.length}
              />
              {item.key != DATA.length && <Divider segmentWidth={"50%"} />}
            </View>
          )}
        />
      </View>
      {/* <Nav /> */}
    </View>
  );
}

export default LanguagePicker;
