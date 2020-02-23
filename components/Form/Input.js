import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome5";

function Input({ name, value, action }) {
  const placeholder = value;
  return (
    <View style={styles.inputView}>
      <Icon name={name} style={styles.icon} />
      <TextInput
        value={email}
        onChangeText={text => action(text)}
        placeholder="Email"
        placeholderTextColor="white"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    paddingBottom: 10,
    borderColor: "lightgray",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    color: "white",
    fontSize: 20
  }
});
