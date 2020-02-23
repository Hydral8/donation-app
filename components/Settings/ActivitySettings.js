import React from "react";
import { View, FlatList, Modal, Text, AsyncStorage, Image } from "react-native";
import SettingsHeader from "./SettingsHeader";
import Donation from "../Donations/Donation";
import { db, auth, storage } from "../../firebase/firebase";
import baseStyles from "../../modules/Styles";
import { months } from "../../modules/Date/dateHelper";
import { FullScreenHeight, FullScreenWidth } from "../../modules/FullScreen";
import GlobalContext from "../../context/GlobalContext";
import History from "../../modules/History";
import Nav from "../Nav/Nav";

const formatTime = timeStamp => {
  const date = new Date(timeStamp);
  return (
    months[date.getMonth() + 1] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
  );
};

function ActivitySettings() {
  const { userDonations } = React.useContext(GlobalContext);
  let [donations, setDonations] = React.useState([]);
  let [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    if (userDonations) {
      setVisible(false);
    }
  }, []);
  // React.useEffect(() => {
  //   console.log(donations);
  // }, [donations]);

  // React.useEffect(() => {
  //   const { uid, profilePic, displayName } = auth.currentUser;
  //   db.collection("users")
  //     .doc(uid)
  //     .get()
  //     .then(doc => {
  //       const user = doc.data();
  //       let tempData = [];
  //       db.collection("photos")
  //         .doc(uid.toString())
  //         .collection("donations")
  //         .orderBy("timeStamp")
  //         .get()
  //         .then(ss => {
  //           //cant use local array to store data
  //           // ss.docs.foreach will run after the subsequent code (async)
  //           // let tempData = [];
  //           return Promise.all(
  //             ss.docs.map(doc => {
  //               return new Promise((res, rej) => {
  //                 const { timeStamp, type, value, preview } = doc.data();
  //                 storage
  //                   .ref()
  //                   .child("images/" + uid + "/" + timeStamp + "/front")
  //                   .getDownloadURL()
  //                   .then(async uri => {
  //                     let obj = {
  //                       key: timeStamp.toString(),
  //                       displayName: user.displayName,
  //                       profilePic: user.profilePic,
  //                       time: formatTime(timeStamp),
  //                       type,
  //                       value,
  //                       preview,
  //                       uri
  //                     };

  //                     // await Image.prefetch(uri);
  //                     res(obj);
  //                   });
  //               });
  //             })
  //           );
  //         })
  //         .then(res => {
  //           // res is array of promises containing all donations
  //           console.log(res);
  //           setDonations(res);
  //           // setUserDonations(res);
  //         });
  //     });
  //   return () => {
  //     setDonations(donations => {
  //       setUserDonations(donations);
  //       return donations;
  //     });
  //   };
  // }, []);

  return (
    <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
      <SettingsHeader action={() => History.goBack()} mode="userDonations" />
      {/* <Modal visible={visible} animationType={"fade"}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Hi</Text>
        </View>
      </Modal> */}
      <FlatList
        style={baseStyles.DonationsContainer}
        data={userDonations}
        extraData={userDonations}
        renderItem={({ item }) => (
          <Donation
            time={item.time}
            profilePic={item.profilePic}
            displayName={item.displayName}
            uri={item.uri}
            type={item.type}
            value={item.value}
            preview={item.preview}
          />
        )}
      />
    </View>
  );
}

export default ActivitySettings;
