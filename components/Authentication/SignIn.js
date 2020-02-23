import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PlatformOSType,
  Keyboard,
  Image,
  Modal
} from "react-native";
import { auth } from "../../firebase/firebase";
import History from "../../modules/History";
import baseStyles from "../../modules/Styles";
import LinearGradient from "../LinearGradient/LinearGradient";
import { FullScreenWidth, FullScreenHeight } from "../../modules/FullScreen";
import FontText from "../FontText/FontText";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import AuthFormSwitch from "./subComponents/AuthFormSwitch";
import GoogleSignInBtn from "./subComponents/GoogleSignInBtn";
import Divider from "../Divider/Divider";
import StandardAuth from "./subComponents/StandardAuth";
import GlobalContext from "../../context/GlobalContext";

const signInAsync = async () => {
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(err => console.error(err));
};

//default font hp(1.8)

function SignIn() {
  const { fontLoaded } = React.useContext(GlobalContext);
  let [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        History.push("/");
      }
    });
  }, []);

  React.useEffect(() => {
    if (fontLoaded) {
      setTimeout(() => {
        setVisible(false);
      }, 0);
    }
  }, [fontLoaded]);

  return (
    <View>
      <Modal visible={!fontLoaded} />
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
              Sign In
            </FontText>
            <StandardAuth
              style={{
                width: "82.5%",
                height: "50%",
                justifyContent: "space-between"
              }}
              angle={120}
              colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
              btnStyle={{
                width: wp("66.8%"),
                height: hp("6.5%"),
                borderRadius: wp("3.34%"),
                justifyContent: "center",
                alignItems: "center"
              }}
              mode="signin"
            />
            <Divider segmentWidth={"20%"} color={"#e1e1e1"} showText={true} />
            <GoogleSignInBtn style={baseStyles.GoogleSignInBtn} />
            <AuthFormSwitch />
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  OAuthBtn: Object.assign({}, baseStyles.Button, {
    flexDirection: "row",
    backgroundColor: "#4285F4"
  })
});

export default SignIn;
