import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Donations from "./Donations/Donations";
import Nav from "./Nav/Nav";
import SettingsHeader from "./Settings/SettingsHeader";

function Home() {
  return (
    <View style={styles.Home}>
      <SettingsHeader
        title="Donations Feed"
        colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
        angle={120}
        noButton={true}
      />
      <Donations />
      <Nav />
    </View>
  );
}

const styles = StyleSheet.create({
  Home: {
    width: "100%",
    height: "100%",
    alignItems: "center"
    // backgroundColor: "red"
  }
});

export default Home;
