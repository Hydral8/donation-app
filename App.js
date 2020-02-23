import React from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { Router, Switch, Route, Redirect } from "react-router-native";
import History from "./modules/History";
import Constants from "expo-constants";
import SignIn from "./components/Authentication/SignIn";
import { ScreenOrientation } from "expo";
import Donate from "./components/Donations/Donate";
import { auth, db, storage, functions } from "./firebase/firebase";
import LanguagePicker from "./components/Settings/LanguageSetting/LanguagePicker";
import AccountSettings from "./components/Settings/AccountSettings";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/Authentication/SignUp";
import Home from "./components/Home";
import ActivitySettings from "./components/Settings/ActivitySettings";
import GlobalContext from "./context/GlobalContext";
import { months } from "./modules/Date/dateHelper";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

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

const getUser = (uid, displayName, profilePic) => {
  return new Promise((res, rej) => {
    if (!displayName || !profilePic) {
      db.collection("users")
        .doc(uid.toString())
        .get()
        .then(doc => {
          displayName = doc.data().displayName;
          profilePic = doc.data().profilePic;
          res({ displayName, profilePic });
        });
    } else {
      res({ displayName, profilePic });
    }
  });
};

const getData = (change, displayName, profilePic) => {
  return new Promise((res, rej) => {
    const { timeStamp, type, value, preview, uid } = change.doc.data();
    getUser(uid, displayName, profilePic).then(
      ({ displayName, profilePic }) => {
        storage
          .ref()
          .child("images/" + uid + "/" + timeStamp + "/front")
          .getDownloadURL()
          .then(uri => {
            // console.log(uri);
            let obj = {
              key: timeStamp.toString(),
              displayName,
              profilePic,
              time: formatTime(timeStamp),
              type,
              value,
              preview,
              uri
            };
            res(obj);
          });
      }
    );
  });
};

export default function App() {
  let [allDonations, setAllDonations] = React.useState([]);
  let [userDonations, setUserDonations] = React.useState([]);
  let [listenDonations, setListenDonations] = React.useState(false);
  let [language, setLanguage] = React.useState("En");
  let [fontLoaded, setFontLoaded] = React.useState(false);
  let [validated, setValidated] = React.useState(false);
  // let [firstCall, setFirstCall] = React.useState(true)
  React.useEffect(() => {
    Font.loadAsync({
      "myriad-pro-bold": require("./assets/fonts/Myriad Pro Bold.ttf"),
      "myriad-pro-reg": require("./assets/fonts/MYRIADPRO-REGULAR.otf"),
      "noto-sans-reg": require("./assets/fonts/NotoSans-Regular.ttf"),
      "noto-sans-bold": require("./assets/fonts/NotoSans-Bold.ttf")
    }).then(() => setTimeout(() => setFontLoaded(true), 0));
  }, []);

  React.useEffect(() => {
    // auth.signInAnonymously().catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });
    History.listen((location, action) => {
      console.log(action, location.pathname, location.state);
    });
  }, []);

  React.useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        setValidated(true);
        let firstCall = true;
        const uid = user.uid;
        const { displayName, profilePic } = await db
          .collection("users")
          .doc(uid.toString())
          .get();
        // .data();
        const unsubscribe = db
          .collection("photos")
          .doc(uid.toString())
          .collection("donations")
          .onSnapshot(ss => {
            if (firstCall) {
              //cant use local array to store data
              // ss.docs.foreach will run after the subsequent code (async)
              // let tempData = [];
              new Promise((res, rej) => {
                res(
                  Promise.all(
                    ss
                      .docChanges()
                      .map(change => getData(change, displayName, profilePic))
                  )
                );
              }).then(res => {
                setUserDonations(res);
              });
            } else {
              getData(change, displayName, profilePic).then(res =>
                setUserDonations(userDonations => [...userDonations, res])
              );
            }
          });
      }
      return () => unsubscribe();
    });
  }, []);

  React.useEffect(() => {
    // console.log(listenDonations);
    if (listenDonations) {
      let firstCall = true;
      const unsubscribe = db.collectionGroup("donations").onSnapshot(ss => {
        // setFirstCall(firstCall => {
        //   if (firstCall) {
        //     return false;
        //   }
        if (firstCall) {
          firstCall = false;
          return;
        }
        ss.docChanges().map(
          change => {
            getData(change).then(res =>
              setAllDonations(allDonations => [
                ...allDonations,
                Object.assign({}, res, { key: allDonations.length.toString() })
              ])
            );
          },
          // change => {
          //   return new Promise((res, rej) => {
          //     const {
          //       timeStamp,
          //       uid,
          //       type,
          //       value,
          //       preview
          //     } = change.doc.data();
          //     const date = new Date(timeStamp);
          //     db.collection("users")
          //       .doc(uid.toString())
          //       .get()
          //       .then(doc => {
          //         const user = doc.data();
          //         storage
          //           .ref()
          //           .child("images/" + uid + "/" + timeStamp + "/front")
          //           .getDownloadURL()
          //           .then(async uri => {
          //             const obj = {
          //               key: (allDonations.length + 1).toString(),
          //               displayName: user.displayName,
          //               profilePic: user.profilePic,
          //               time: formatTime(timeStamp),
          //               type,
          //               value,
          //               preview,
          //               uri
          //             };
          //             let completed = await Image.prefetch(uri);
          //             if (completed) {
          //               console.log(completed);
          //               setAllDonations(donations => {
          //                 console.log("hi");
          //                 return [...donations, obj];
          //               });
          //             }
          //             return res();
          //           });
          //       });
          //   });
          // },
          err => console.log(err)
        );
      });
      return () => unsubscribe();
    }
  }, [listenDonations]);
  return (
    <SafeAreaProvider>
      <GlobalContext.Provider
        value={{
          language,
          setLanguage,
          allDonations,
          setListenDonations,
          userDonations,
          setUserDonations,
          fontLoaded
        }}
      >
        <View style={styles.container}>
          {/* Routes */}
          <Router history={History}>
            <Switch>
              <Route
                exact
                path="/"
                render={props => {
                  // return store.getState().users.allIDs.length ?
                  return validated ? (
                    <Home {...props} />
                  ) : (
                    <Redirect to="/signin" {...props} />
                  );
                }}
              />
              <Route path="/donate" component={Donate} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              {/* Profile Routes */}
              <Route exact path="/profile" component={Profile} />
              <Route
                path="/profile/languagePicker"
                component={LanguagePicker}
              />
              <Route
                path="/profile/accountSettings"
                component={AccountSettings}
              />
              <Route
                path="/profile/activitySettings"
                component={ActivitySettings}
              />
              <Route
                render={props => (
                  <View>
                    <Text>No Match</Text>
                  </View>
                )}
              />
            </Switch>
          </Router>
        </View>
      </GlobalContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center"
    // justifyContent: "center"
  },
  test: {
    top: 0,
    height: Constants.statusBarHeight,
    width: Dimensions.get("window").width,
    backgroundColor: "violet"
  }
});
