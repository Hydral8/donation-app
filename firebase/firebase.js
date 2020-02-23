import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
let config = {
  apiKey: "AIzaSyBRgi3KFM6T2NdAnTPGJeBZhOnrD3b4ZVk",
  authDomain: "giftcard-app-254720.firebaseapp.com",
  databaseURL: "https://giftcard-app-254720.firebaseio.com",
  projectId: "giftcard-app-254720",
  storageBucket: "giftcard-app-254720.appspot.com",
  messagingSenderId: "423009903286",
  appId: "1:423009903286:web:67570c1c1030a99785fc17",
  measurementId: "G-MHYT9XMWLF"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider, firebase };
