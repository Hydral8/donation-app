import React from "react";
import LinearGradient from "../LinearGradient/LinearGradient";
import {
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard
} from "react-native";
import FontText from "../FontText/FontText";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import baseStyles from "../../modules/Styles";
import { auth } from "../../firebase/firebase";

const changePassword = (
  password,
  oldPassword,
  newPassword,
  setChangePassword
) => {
  if (!newPassword.trim()) {
    if (oldPassword === password) {
      auth.currentUser.updatePassword(newPassword);
      setChangePassword(false);
    }
  }
};

function PasswordChange({ password, setChangePassword }) {
  let [oldPassword, setOldPassword] = React.useState("");
  let [newPassword, setNewPassword] = React.useState("");
  return (
    <TouchableWithoutFeedback
      onPress={e => {
        Keyboard.dismiss();
        e.stopPropagation();
      }}
    >
      <LinearGradient
        colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
        angle={120}
        style={{
          width: wp("94.2%"),
          height: hp("37%"),
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: wp("94.2%") * 0.08
        }}
      >
        <TextInput
          placeholder="Old Password"
          onChangeText={text => setOldPassword(text)}
          style={[
            baseStyles.AuthInput,
            {
              width: "86.25%",
              borderRadius: wp("4.06"),
              paddingLeft: "10%"
            }
          ]}
        />
        <TextInput
          placeholder="New Password"
          onChangeText={text => setNewPassword(text)}
          style={[
            baseStyles.AuthInput,
            {
              width: "86.25%",
              borderRadius: wp("4.06"),
              paddingLeft: "10%"
            }
          ]}
        />
        <TouchableOpacity
          style={[
            baseStyles.Button,
            {
              backgroundColor: "plum"
            }
          ]}
          onPress={() =>
            changePassword(
              password,
              oldPassword,
              newPassword,
              setChangePassword
            )
          }
        >
          <FontText
            style={{
              fontFamily: "myriad-pro-bold",
              color: "white"
            }}
          >
            Change Password
          </FontText>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default PasswordChange;
