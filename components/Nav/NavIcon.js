import React from "react";
import { Icon } from "react-native-elements";
import History from "../modules/History.js";

function NavIcon({ name, mode, selectedNum }) {
  return (
    <Icon
      name={name}
      type="feather"
      size={30}
      color={
        mode === "default"
          ? "black"
          : name === "plus-icon"
          ? "transparent"
          : "white"
      }
    />
  );
}

export default NavIcon;
