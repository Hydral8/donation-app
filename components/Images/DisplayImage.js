import React from "react";
import { Image } from "react-native";
import Constants from "expo-constants";
import { FullScreenWidth, FullScreenHeight } from "../../modules/FullScreen";

function DisplayImage({ selectedImgUri, selectedImgOrientation }) {
  // console.log(selectedImgUri || "https://facebook.github.io/react/logo-og.png");
  return (
    <Image
      source={{
        uri: selectedImgUri || "https://facebook.github.io/react/logo-og.png"
      }}
      style={{
        width:
          selectedImgOrientation === "portrait"
            ? FullScreenWidth
            : FullScreenHeight - 100,
        height:
          selectedImgOrientation === "portrait"
            ? FullScreenHeight - 100
            : FullScreenWidth,
        //since main app has Status bar Margin, must do -top to have fullscreen
        position: "absolute",
        zIndex: 4,
        transform: [
          { rotate: selectedImgOrientation === "portrait" ? "0deg" : "90deg" }
        ]
      }}
    />
  );
}

export default DisplayImage;

// const styles = {
//   DisplayedImage: {
//     width:
//       selectedImgOrientation === "portrait"
//         ? FullScreenWidth
//         : FullScreenHeight - 100,
//     height:
//       selectedImgOrientation === "portrait"
//         ? FullScreenHeight - 100
//         : FullScreenWidth,
//     //since main app has Status bar Margin, must do -top to have fullscreen
//     top: -Constants.statusBarHeight,
//     position: "absolute",
//     zIndex: 4,
//     transform: [
//       { rotate: selectedImgOrientation === "portrait" ? "0deg" : "90deg" }
//     ]
//   }
// };
