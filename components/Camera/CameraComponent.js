import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

function CameraComponent() {
  let [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  let [type] = React.useState(Camera.Constants.Type.back);
  let [cameraRef, setCameraRef] = React.useState(null);
  //get permission
  React.useEffect(() => {
    Permissions.askAsync(Permissions.CAMERA).then(res => {
      setHasCameraPermission(res.status === "granted");
    });
    Permissions.askAsync(Permissions.CAMERA_ROLL).then(res => console.log(res));
  }, []);

  const takePhoto = async () => {
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images
    // });
    if (cameraRef) {
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100
      }).start();
      let photo = await cameraRef.takePictureAsync();
      console.log(photo.uri);
      setSnapshot(photo.uri);
    }
  };
  // if (hasCameraPermission === null) {
  //   return <View />;
  // } else if (hasCameraPermission === false) {
  //   return <Text>No access to camera</Text>;
  // } else {
  return (
    <View style={styles.CameraContainer}>
      <View style={styles.Camera}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={node => setCameraRef(node)}
        ></Camera>
      </View>
      <View style={styles.CaptureBorder}>
        <TouchableOpacity style={styles.Capture} onPress={() => takePhoto()} />
      </View>
    </View>
  );
  // }
}

const styles = StyleSheet.create({
  CameraContainer: {
    width: "100%",
    height: "100%",
    zIndex: 0,
    position: "absolute"
  },
  Camera: {
    flex: 1
  },
  Capture: {
    width: 53,
    height: 53,
    borderRadius: 53 / 2,
    backgroundColor: "white"
  },
  CaptureBorder: {
    width: 70,
    height: 70,
    backgroundColor: "transparent",
    borderWidth: 5,
    borderRadius: 70 / 2,
    borderColor: "white",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    zIndex: 2
  }
});

export default CameraComponent;
