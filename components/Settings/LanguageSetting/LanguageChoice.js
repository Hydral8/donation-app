import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function LanguageChoice({ language, id, length }) {
  return (
    <TouchableOpacity style={styles.LanguageChoice}>
      <Text>{language}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  LanguageChoice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: hp("4.926%")
  }
});

export default LanguageChoice;
