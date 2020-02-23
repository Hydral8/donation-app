import { StyleSheet } from "react-native";
import { FullScreenHeight, FullScreenWidth } from "./FullScreen";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

const defBtnWidth = wp("66.8%");
const defBtnHeight = hp("6.5%");

const baseStyles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    width: FullScreenWidth,
    height: hp("11.6%"),
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 3
  },

  Button: {
    width: wp("81.25%"),
    height: hp("6.5%"),
    borderRadius: wp("4.06%"),
    justifyContent: "center",
    alignItems: "center"
  },

  //Authentication container, form, formView, FOrmInput, and FormIcon Styles

  AuthContainer: {
    width: FullScreenWidth,
    height: FullScreenHeight,
    justifyContent: "center",
    alignItems: "center"
  },

  AuthForm: {
    width: "81%",
    height: "60%",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    borderRadius: 20
  },
  AuthInput: {
    color: "#42404b",
    backgroundColor: "#f8f8f8",
    width: "100%",
    paddingLeft: "5%",
    height: defBtnHeight,
    borderRadius: wp("3.34%")
  },
  GoogleSignInBtn: {
    flexDirection: "row",
    width: defBtnWidth,
    height: defBtnHeight,
    borderWidth: 1,
    borderRadius: wp("3.34%"),
    borderColor: "#42404b",
    justifyContent: "center",
    alignItems: "center"
  },
  DonationsContainer: {
    // paddingTop: 20,
    width: "100%"
  },
  DefaultFont: {
    fontFamily: "myriad-pro-bold",
    fontSize: hp("1.8%")
  }
});

export default baseStyles;
