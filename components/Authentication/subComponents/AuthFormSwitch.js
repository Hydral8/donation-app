import React from "react";
import { View, TouchableOpacity } from "react-native";
import FontText from "../../FontText/FontText";
import History from "../../../modules/History";

function AuthFormSwitch({ style, to, mode }) {
  return (
    <View style={[style, { flexDirection: "row" }]}>
      <FontText>Don't Have An Account? </FontText>
      <TouchableOpacity
        onPress={() => {
          mode === "signup" ? History.push("/signin") : History.push("/signup");
        }}
      >
        <FontText style={{ color: "#169ff1" }}>
          {mode === "signup" ? "Sign In!" : "Sign Up!"}
        </FontText>
      </TouchableOpacity>
    </View>
  );
}

export default AuthFormSwitch;
