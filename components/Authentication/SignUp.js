import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  PlatformOSType,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import History from "../../modules/History";
import { auth, db } from "../../firebase/firebase";
import { googleSignIn } from "../../modules/oAuth/oAuthProviders";
import baseStyles from "../../modules/Styles";
import { FullScreenWidth, FullScreenHeight } from "../../modules/FullScreen";
import FontText from "../FontText/FontText";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import StandardAuth from "./subComponents/StandardAuth";
import Divider from "../Divider/Divider";
import GoogleSignInBtn from "./subComponents/GoogleSignInBtn";
import AuthFormSwitch from "./subComponents/AuthFormSwitch";

function SignUp() {
  let [name, setName] = React.useState("");
  // temporarily stored name for updating firebase user
  // necessary as firebase call may fail, making name not change to "" if tempname is not used
  let [tempName, setTempName] = React.useState("");

  React.useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        await setTempName(async tempName => {
          if (tempName !== "") {
            console.log("working");
            await user.updateProfile({
              displayName: tempName
            });
            let doc = await db
              .collection("users")
              .doc(user.uid.toString())
              .set({
                displayName: tempName,
                email: user.email,
                profilePic: user.profilePic ? user.profilePic : null
              });
          }
          console.log(user.getIdToken);
          return "";
        });
        History.push("/");
      }
    });
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <LinearGradient
        colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
        angle={120}
        width={FullScreenWidth}
        height={FullScreenHeight}
        style={baseStyles.AuthContainer}
      >
        <View style={baseStyles.AuthForm}>
          <FontText
            style={{
              marginTop: hp("2%"),
              fontFamily: "myriad-pro-bold",
              fontWeight: "bold",
              color: "#42404b",
              //1.8 is def size
              fontSize: hp("2.4%")
            }}
          >
            Sign Up
          </FontText>
          <StandardAuth
            style={{
              width: "82.5%",
              height: "50%",
              justifyContent: "space-between"
            }}
            setTempName={setTempName}
            angle={120}
            colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
            btnStyle={{
              width: wp("66.8%"),
              height: hp("6.5%"),
              borderRadius: wp("3.34%"),
              justifyContent: "center",
              alignItems: "center"
            }}
            mode="signup"
          />
          <Divider segmentWidth={"20%"} color={"#e1e1e1"} showText={true} />
          <GoogleSignInBtn style={baseStyles.GoogleSignInBtn} mode="signup" />
          <AuthFormSwitch mode="signup" />
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  OAuthBtn: Object.assign({}, baseStyles.Button, {
    flexDirection: "row",
    backgroundColor: "#4285F4"
  })
});

export default SignUp;
