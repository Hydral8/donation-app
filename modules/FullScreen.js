import { Dimensions } from "react-native";

const { width: FullScreenWidth, height: FullScreenHeight } = Dimensions.get(
  "window"
);

export { FullScreenWidth, FullScreenHeight };
