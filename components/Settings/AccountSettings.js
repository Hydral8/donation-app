import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Animated
} from "react-native";
import SettingsHeader from "./SettingsHeader";
import ProfilePic from "../Profile/ProfilePic";
import { auth, db, firebase } from "../../firebase/firebase";
import LinearGradient from "../LinearGradient/LinearGradient";
import { FullScreenWidth } from "../../modules/FullScreen";
import FontText from "../FontText/FontText";
import Nav from "../Nav/Nav";
import baseStyles from "../../modules/Styles";
import LinearGradButton from "../Button/LinearGradButton";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import PasswordChange from "./PasswordChange";
import History from "../../modules/History";

const updateUserDb = ({ name, email, profilePic, uid }) => {
  db.collection("user")
    .doc(uid.toString())
    .set({ displayName: name, email, profilePic });
};

const updateAccount = (name, email, password, profilePic) => {
  const {
    displayName,
    email: userEmail,
    photoURL: userProfilePic
  } = auth.currentUser;

  return new Promise(async (res, rej) => {
    // console.log(userPassword);
    if (!password.trim()) {
      res(true);
      return;
    }
    let credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    await auth.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        if (email !== userEmail && !email.trim()) {
          auth.currentUser.updateEmail(email);
          updateUserDb(name, email, profilePic, uid);
        }
        //if name or profilepic is different update auth user using updateProfile
        //if name, profilepic, or email is diff update User DB by setting all 3 props at once
        if (
          (name !== displayName && !name.trim()) ||
          (profilePic !== userProfilePic && !userProfilePic.trim())
        ) {
          auth.updateCurrentUser({
            displayName: name,
            profilePic
          });
          updateUserDb(name, email, profilePic, uid);
        } else if (email !== userEmail) {
          updateUserDb(name, email, profilePic, uid);
        }
      })
      .catch(err => console.error(err));
    res(true);
  });
};

function AccountSettings() {
  const {
    displayName,
    email: userEmail,
    password: userPassword,
    photoUrl: userProfilePic
  } = auth.currentUser;
  let [name, setName] = React.useState(displayName);
  let [email, setEmail] = React.useState(userEmail);
  let [password, setPassword] = React.useState("");
  let [profilePic, setProfilePic] = React.useState(userProfilePic);
  let [changePassword, setChangePassword] = React.useState(false);
  let [opacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (changePassword)
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 500
      }).start();
  }, [changePassword]);

  const accountSettings = [
    { type: "Name", action: setName, ref: name },
    { type: "Email", action: setEmail, ref: email },
    {
      type: "Confirm Changes With Password",
      action: setPassword,
      ref: password
    }
  ];
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        if (changePassword) setChangePassword(false);
      }}
    >
      <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
        <SettingsHeader
          hasBackground={true}
          mode={"updateAcct"}
          action={() => {
            console.log(password);
            updateAccount(name, email, password, profilePic).then(() =>
              History.goBack()
            );
          }}
        />
        <LinearGradient
          colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
          angle={120}
          style={{
            width: FullScreenWidth,
            height: hp("37%"),
            position: "absolute"
          }}
        />
        {changePassword && (
          <Animated.View
            style={{
              position: "absolute",
              zIndex: 3,
              top: "30%",
              opacity: opacity.interpolate({
                inputRange: [0, 0.5],
                outputRange: [0, 1]
              })
            }}
          >
            <PasswordChange
              password={password}
              setChangePassword={setChangePassword}
            />
          </Animated.View>
        )}
        {changePassword && (
          <Animated.View
            style={{
              zIndex: 2,
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              opacity
            }}
          />
        )}
        <View
          style={{
            //to force photo overlap make top equal to lineargradient height - the photo radius
            top: hp("7.87%"),
            height: "65%",
            width: "94.2%",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              width: "100%",
              borderRadius: wp("94.2%") * 0.08,
              height: "35%",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <View style={{ height: wp("94.2%") / 6 }}>
              <ProfilePic
                uri={
                  userProfilePic ||
                  "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                }
                photoSize={wp("94.2%") / 3}
                style={{ top: -wp("94.2%") / 6 }}
              />
            </View>
            <FontText
              style={{
                fontSize: hp("2.5%"),
                marginTop: "10%"
                // paddingtop also works
              }}
            >
              {displayName}
            </FontText>
          </View>
          <View
            style={[
              styles.AccountSettingsContainer,
              { borderRadius: wp("94.2%") * 0.08 }
            ]}
          >
            <View
              style={{
                width: "100%",
                height: "90%",
                justifyContent: "space-evenly",
                alignItems: "center"
              }}
            >
              {accountSettings.map((v, i) => (
                <TextInput
                  key={i}
                  placeholder={v.type}
                  value={v.ref}
                  onChangeText={text => v.action(text)}
                  style={[
                    baseStyles.AuthInput,
                    {
                      width: "86.25%",
                      borderRadius: wp("4.06"),
                      paddingLeft: "10%"
                    }
                  ]}
                />
              ))}
              <LinearGradButton
                action={() => setChangePassword(true)}
                title={"Change Password"}
              />
            </View>
          </View>
        </View>
        {/* <Nav /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  AccountSetting: {
    width: "90%"
  },
  AccountSettingsContainer: {
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  AccountSettingType: {
    textAlign: "left",
    fontSize: 20
  },
  AccountSettingInput: {
    width: "100%",
    fontSize: 20,
    height: 50,
    backgroundColor: "hsla(211, 15%, 97%, 1)"
  }
});

export default AccountSettings;
