import React from "react";
import baseStyles from "../../../modules/Styles";
import { View, TextInput, TouchableOpacity } from "react-native";
import FontText from "../../FontText/FontText";
import LinearGradient from "../../LinearGradient/LinearGradient";
import PropTypes from "prop-types";
import { auth } from "../../../firebase/firebase";

const signInAsync = async (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(err => console.error(err));
};

const signUpAsync = async (email, password) => {
  console.log("hi");
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch(err => console.log(err));
};

function StandardAuth({ style, angle, colors, btnStyle, mode, setTempName }) {
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  return (
    <View style={style}>
      {mode === "signup" && (
        <TextInput
          onChangeText={text => setTempName(text)}
          placeholder="Name"
          placeholderTextColor="#848487"
          style={baseStyles.AuthInput}
        />
      )}
      <TextInput
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        placeholderTextColor="#848487"
        style={baseStyles.AuthInput}
      />
      <TextInput
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        placeholderTextColor="#848487"
        style={baseStyles.AuthInput}
      />
      {/* def is signin */}
      <TouchableOpacity
        onPress={() =>
          mode === "signup"
            ? signUpAsync(email, password)
            : signInAsync(email, password)
        }
      >
        <LinearGradient
          colors={colors}
          angle={angle}
          width={btnStyle.width}
          height={btnStyle.height}
          style={btnStyle}
        >
          <FontText
            style={{
              color: "white"
            }}
          >
            {mode === "signup" ? "Sign Up" : "Sign In"}
          </FontText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

StandardAuth.propTypes = {
  btnStyle: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
};

export default StandardAuth;
