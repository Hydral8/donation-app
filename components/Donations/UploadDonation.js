import React from "react";
import {
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { FullScreenHeight, FullScreenWidth } from "../../modules/FullScreen";
import { auth, db, storage } from "../../firebase/firebase";
import baseStyles from "../../modules/Styles";
import SettingsHeader from "../Settings/SettingsHeader";
import LinearGradient from "../LinearGradient/LinearGradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import FontText from "../FontText/FontText";
import Quote from "./Quote";
import DonationDetail from "./DonationDetail";
import LinearGradButton from "../Button/LinearGradButton";

const uploadPhoto = async (photo1Uri, photo2Uri, type, value, preview) => {
  const { uid } = auth.currentUser;
  const date = +new Date();

  console.log(date);
  const response1 = await fetch(photo1Uri);
  const blob1 = await response1.blob();
  const response2 = await fetch(photo2Uri);
  const blob2 = await response2.blob();

  uploadPhotoToStorage(blob1, date, uid, "front").then(() =>
    uploadPhotoToStorage(blob2, date, uid, "back")
      .then(ss => uploadPhotoToDB(date, uid, type, value, preview))
      .catch(err => {
        throw Error(err);
      })
  );
};

const uploadPhotoToStorage = async (blob, date, uid, type) => {
  const ss = await storage
    .ref()
    .child("images/" + uid + "/" + date + "/" + type)
    .put(blob)
    .catch(err => {
      throw Error(err);
    });

  return ss;
};

const uploadPhotoToDB = async (date, uid, type, value, preview) => {
  db.collection("photos")
    .doc(uid)
    .collection("donations")
    .doc(date.toString())
    .set({ timeStamp: date, uid, type, value, preview })
    .catch(err => {
      throw Error(err);
    });
};

function UploadDonation({ photo1Uri, photo2Uri, setUpload, preview }) {
  let [type, setType] = React.useState("");
  let [value, setValue] = React.useState("");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          width: "100%",
          height: FullScreenHeight,
          position: "absolute",
          zIndex: 6,
          alignItems: "center",
          backgroundColor: "#eeeeee"
        }}
      >
        <LinearGradient
          colors={["#00c1f7", "#0c98ea", "#19a3f4"]}
          angle={120}
          style={{
            //width can only be string if it represents width % of entire phone width
            //not parent
            //same for height
            width: FullScreenWidth,
            height: hp("37%"),
            position: "absolute"
          }}
        />
        <SettingsHeader
          mode={"upload"}
          hasBackground={true}
          action={() => setUpload(false)}
        />
        <Quote style={{ width: "94.2%", height: "22.8%" }} />
        <View
          style={{
            width: "94.2%",
            top: hp("37%"),
            position: "absolute",
            height: "63%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: "100%",
              height: "80%",
              borderRadius: wp(4.71),
              backgroundColor: "white",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "100%",
                top: "4%",
                height: "95%",
                justifyContent: "space-evenly",
                alignItems: "center"
              }}
            >
              <FontText
                style={{
                  fontFamily: "myriad-pro-bold",
                  fontSize: hp("2.5%")
                }}
              >
                Donation
              </FontText>
              <DonationDetail type="Type" action={setType} />
              <DonationDetail type="Value" action={setValue} />

              <LinearGradButton
                action={() => {
                  uploadPhoto(photo1Uri, photo2Uri, type, value, preview)
                    .then(data => setUpload(false))
                    .catch(err => {
                      setType("");
                      setValue("");
                      return;
                    });
                }}
                title={"Donate"}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default UploadDonation;
