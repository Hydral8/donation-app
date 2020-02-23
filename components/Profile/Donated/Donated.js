import React from "react";
import { View, Text } from "react-native";
import DonatedStat from "./DonatedStat";

function Donated({ style }) {
  return (
    <View
      style={[
        style,
        {
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          width: "70%",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <DonatedStat stat={"This Month"} value={200} />
        <DonatedStat stat={"All Time"} value={200} />
      </View>
    </View>
  );
}

export default Donated;
