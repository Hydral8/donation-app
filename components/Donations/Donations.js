import React from "react";
import { FlatList, View } from "react-native";
import Donation from "./Donation";
import { storage, db, auth } from "../../firebase/firebase";
import GlobalContext from "../../context/GlobalContext";
import baseStyles from "../../modules/Styles";
import { months } from "../../modules/Date/dateHelper";
import { FullScreenHeight } from "../../modules/FullScreen";
import Constants from "expo-constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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

function Donations() {
  const { allDonations, setListenDonations } = React.useContext(GlobalContext);
  console.log(allDonations);
  React.useEffect(() => {
    setListenDonations(true);
  }, []);
  return (
    <View style={{ top: hp("1%"), width: "100%" }}>
      <FlatList
        style={{}}
        data={allDonations}
        extraData={allDonations}
        renderItem={({ item }) => {
          return (
            <Donation
              time={item.time}
              profilePic={item.profilePic}
              displayName={item.displayName}
              uri={item.uri}
              type={item.type}
              value={item.value}
              preview={item.preview}
            />
          );
        }}
      />
    </View>
  );
}

export default Donations;
