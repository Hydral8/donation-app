import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

const degToRad = deg => {
  return deg * (Math.PI / 180);
};

const findOpp = (rad, adj) => {
  //tan = opp/adj -> tan * adj = opp
  let tanVal = Math.round(Math.tan(rad) * 100000) / 100000;
  return tanVal * adj;
};

const findAdj = (rad, opp) => {
  // 1/tan = adj / opp -> 1/tan * opp = adj
  let cotVal = Math.round((1 / Math.tan(rad)) * 100000) / 100000;
  return cotVal * opp;
};

const getChange = (angle, start, width, height) => {
  const sides = [width, height];
  let side = start[0] === start[1] ? 0 : 1;
  let adj = sides[side];
  const rad = degToRad(angle);
  const opp = findOpp(rad, adj);
  let x, y;
  //distance extended on the height or width of rectangle
  //end point may pass the full length of its designated side (height or width)
  const extension = opp - width;
  //use extension to find the distance covered on the side after cur
  if (extension > 0) {
    //find adjacent side of angle rad on triangle which has an opp length of extension
    //adj will never be greater than 1 since (1/tan) * (tan * adj - w) cannot be greater than adj
    //also from 0 <= theta <= 90, all angles are within the 1st quadrant, they cannot exceed the quadrant's boundary
    let adj = findAdj(rad, extension);
    if (side === 0) {
      // console.log("hi");
      //find overlap onto next side based on the position of start
      //if start is 0 any additional overlap is in + dir, other in - dir
      let adjDec = adj / width;
      // console.log(adj);
      if (start[0] === 0) {
        x = 1 - adjDec;
      } else {
        x = adjDec;
      }
      //convert to percentage
      y = 1 - start[1];
    } else {
      let adjDec = adj / height;
      if (start[1] === 0) {
        y = 1 - adjDec;
      } else {
        y = adjDec;
      }
      //convert to percentage
      x = 1 - start[0];
    }
  } else {
    if (side === 0) {
      y = start[1] < 1 ? opp / height : start[1] - opp / width;
      x = 1 - start[0];
    } else {
      x = start[0] < 1 ? opp / width : start[0] - opp / width;
      y = 1 - start[1];
    }
  }
  return { x, y };
};

const getStartEnd = (angle, width, height) => {
  let start;
  let end;
  //choose dif start points that match the direction of gradient
  if (angle < 90) {
    start = [0, 1];
  } else if (angle < 180) {
    start = [0, 0];
  } else if (angle < 270) {
    start = [1, 0];
  } else {
    start = [1, 1];
  }
  //get min value of angle
  angle %= 90;
  let { x, y } = getChange(angle, start, width, height);
  end = [x, y];
  return { start, end };
};

function LinearGradient({
  angle,
  colors,
  width,
  height,
  style,
  onPress,
  children,
  ...props
}) {
  let [start, setStart] = React.useState([0, 0]);
  let [end, setEnd] = React.useState([1, 1]);
  React.useEffect(() => {
    if (!colors) {
      colors = ["white", "white"];
    }
    if (angle === null) {
      start = [0, 0];
      end = [1, 1];
    } else {
      let { width, height } = style;
      if (typeof width === "string") {
        width = wp(width);
      }
      if (typeof height === "string") {
        height = hp(height);
      }
      const { start: startPos, end: endPos } = getStartEnd(
        angle,
        width,
        height
      );
      // start = startPos;
      // end = endPos;
      setStart(startPos);
      setEnd(endPos);
    }
  }, []);
  // let start, end;
  // }, []);
  return (
    // <TouchableWithoutFeedback onPress={onPress}>
    <ExpoLinearGradient
      start={start}
      end={end}
      colors={colors}
      style={style}
      {...props}
    >
      {children}
    </ExpoLinearGradient>
    // </TouchableWithoutFeedback>
  );
}

export default LinearGradient;
