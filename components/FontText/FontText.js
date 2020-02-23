import React, { useContext } from "react";
import { Text } from "react-native";
import GlobalContext from "../../context/GlobalContext";
import baseStyles from "../../modules/Styles";

function FontText({ style, children, type }) {
  const { fontLoaded } = useContext(GlobalContext);
  if (!style) {
    style = baseStyles.DefaultFont;
  }
  if (!style.fontFamily) {
    style.fontFamily = baseStyles.DefaultFont.fontFamily;
  }
  if (!style.fontSize) {
    style.fontSize = baseStyles.DefaultFont.fontSize;
  }
  if (
    style.fontFamily === "myriad-pro-bold" ||
    style.fontFamily === "myriad-pro-reg"
  ) {
    style.height = style.fontSize + style.fontSize * 0.1;
  }
  // React.useEffect(() => {
  //   console.log(style.fontSize * 0.1);
  // }, []);
  return fontLoaded ? <Text style={style}>{children}</Text> : null;
}

export default FontText;
