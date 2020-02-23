import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Image
} from "react-native";
import { Camera } from "expo-camera";
import Nav from "../Nav/Nav";
import * as Permissions from "expo-permissions";
import * as Brightness from "expo-brightness";
import DisplayImage from "../Images/DisplayImage";
import { FullScreenHeight } from "../../modules/FullScreen";
import UploadDonation from "./UploadDonation";
import * as ImageManipulator from "expo-image-manipulator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import FontText from "../FontText/FontText";

let hasCameraPermission;
Permissions.askAsync(Permissions.CAMERA).then(
  res => (hasCameraPermission = res.status)
);

function Donate() {
  //states
  let [type] = React.useState(Camera.Constants.Type.back);
  let [cameraRef, setCameraRef] = React.useState(null);
  let [opacity] = React.useState(new Animated.Value(0));
  let [imgSelectedColor, setImgSelectedColor] = React.useState("black");
  //the actual current photos
  let [photo1Uri, setPhoto1Uri] = React.useState(null);
  let [photo1Compressed, setPhoto1compressed] = React.useState(null);
  let [photo2Uri, setPhoto2Uri] = React.useState(null);
  let [photo1Orientation, setPhoto1Orientation] = React.useState("portrait");
  let [photo2Orientation, setPhoto2Orientation] = React.useState("portrait");
  let [preview, setPreview] = React.useState(null);
  //curent photo to take
  let [curPhoto, setCurPhoto] = React.useState(1);
  //color for icons
  let [color, setColor] = React.useState(null);
  //whether images are selected or not
  let [img1, setImg1] = React.useState(false);
  let [img2, setImg2] = React.useState(false);
  //retake button availability state
  let [retakeVisible, setRetakeVisible] = React.useState(false);
  //photo button disabled settings
  let [disabled, setDisabled] = React.useState(false);
  let [opacityUpload] = React.useState(new Animated.Value(0));
  let [upload, setUpload] = React.useState(false);
  //get permission and brightness
  React.useEffect(() => {
    Brightness.getBrightnessAsync().then(res =>
      res > 0.5 ? setColor("black") : setColor("white")
    );
  }, []);

  React.useEffect(() => {
    if (photo1Uri && photo2Uri) {
      Animated.timing(opacityUpload, {
        toValue: 1,
        duration: 200
      }).start();
    }
  }, [photo1Uri, photo2Uri]);

  //when image 1 or image 2 is selected
  React.useEffect(() => {
    if (img1 || img2) {
      setRetakeVisible(true);
      setDisabled(true);
      setImgSelectedColor("white");
      Animated.timing(opacity, {
        toValue: 0.2,
        duration: 200
      }).start();
    } else {
      setRetakeVisible(false);
      setDisabled(false);
      setImgSelectedColor("black");
      opacity.setValue(0);
    }
  }, [img1, img2]);

  //methods
  const takePhoto = async () => {
    if (cameraRef) {
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100
      }).start();
      let photo = await cameraRef.takePictureAsync({
        quality: curPhoto === 1,
        exif: true
      });
      setPhoto1Uri(photo.uri);
      let compressedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: wp("35%"), height: wp("35%") } }],
        { compress: 0, quality: 0, base64: true }
      );
      if (curPhoto === 1) {
        setPhoto1compressed(compressedPhoto.uri);
        setPhoto1Orientation(
          photo.exif.Orientation === 0 ? "landscape" : "portrait"
        );
        setPreview("data:image/jpg;base64," + compressedPhoto.base64);
        setCurPhoto(2);
      } else {
        setPhoto2Uri(photo.uri);
        setPhoto2Orientation(
          photo.exif.Orientation === 0 ? "landscape" : "portrait"
        );
        setCurPhoto(1);
      }
    }
  };
  //375 812

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center"
        }}
      >
        <Animated.View
          style={{
            width: "100%",
            height: FullScreenHeight,
            //since main app has Status bar Margin, must do -top to have fullscreen
            backgroundColor: imgSelectedColor,
            opacity: opacity.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 1, 0]
            }),
            zIndex: 1
          }}
        />
        <Animated.View
          style={[
            styles.RetakePhotoBtn,
            {
              opacity: opacityUpload
            }
          ]}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: wp("12.5%")
            }}
            onPress={() => setUpload(true)}
          >
            <Text style={{ color }}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
        {upload && (
          <UploadDonation
            photo1Uri={photo1Compressed}
            photo2Uri={photo2Uri}
            setUpload={setUpload}
            preview={preview}
          />
        )}
        {(img1 || img2) && (
          <DisplayImage
            selectedImgUri={img1 ? photo1Uri : photo2Uri}
            selectedImgOrientation={
              img1 ? photo1Orientation : photo2Orientation
            }
          />
        )}
        {retakeVisible && (
          <TouchableOpacity
            style={styles.RetakePhotoBtn}
            onPress={() => {
              if (img1) setCurPhoto(1);
              else setCurPhoto(2);
              setImg1(false);
              setImg2(false);
            }}
          >
            <FontText style={{ fontFamily: "myriad-pro-reg", color: "white" }}>
              Retake Photo
            </FontText>
          </TouchableOpacity>
        )}
        {/* <CameraComponent /> -- > Can't press photo button if inside the component*/}
        <View style={styles.CameraContainer}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            ref={node => setCameraRef(node)}
          ></Camera>
        </View>
        <View style={styles.CaptureBorder}>
          <TouchableOpacity
            style={styles.Capture}
            onPress={() => takePhoto()}
            disabled={disabled}
          />
        </View>

        <View style={styles.Footer}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("hi");
              setImg1(!img1);
              setImg2(false);
            }}
          >
            <Image
              source={{
                uri: photo1Uri || "https://facebook.github.io/react/logo-og.png"
              }}
              style={styles.ImagePreview}
            />
          </TouchableWithoutFeedback>
          <Nav mode={"camera"} color={color} />
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("bye");

              setImg2(!img2);
              setImg1(false);
            }}
          >
            <Image
              source={{
                uri: photo2Uri || "https://facebook.github.io/react/logo-og.png"
              }}
              style={styles.ImagePreview}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const captureSize = wp("14.13%");
const captureBorderSize = wp("18.67%");

const styles = StyleSheet.create({
  CameraContainer: {
    flex: 1,
    width: "100%",
    height: FullScreenHeight,
    zIndex: 0,
    position: "absolute"
  },
  Capture: {
    width: captureSize,
    height: captureSize,
    borderRadius: captureSize / 2,
    backgroundColor: "white",
    opacity: 0.9
  },
  CaptureBorder: {
    width: captureBorderSize,
    height: captureBorderSize,
    backgroundColor: "transparent",
    borderWidth: wp("1.33%"),
    borderRadius: captureBorderSize / 2,
    borderColor: "hsla(0, 0%, 100%, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: hp("2.46%"),
    zIndex: 3,
    shadowOffset: { height: hp("0.7%"), width: wp("0.35%") }, //IOS
    shadowOpacity: 0.2, //IOS
    shadowRadius: hp("0.7%"), //IOS
    elevation: 2
  },
  ImagePreview: {
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: wp("7%")
  },
  RetakePhotoBtn: {
    width: wp("40%"),
    borderRadius: wp("12.5%"),
    height: hp("6.16%"),
    backgroundColor: "#19a3f4",
    zIndex: 5,
    position: "absolute",
    bottom: hp("16%"),
    alignItems: "center",
    justifyContent: "center"
  },
  Footer: {
    position: "absolute",
    //bottom of captureborder + half of captureborder height - half of image height -->
    //center of footer == center of capturerBorder
    bottom: hp("2.46%") + wp("9.335%") - wp("7%"),
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2
  }
});

export default Donate;
