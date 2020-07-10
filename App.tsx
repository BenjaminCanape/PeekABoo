import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RNCamera, Face } from "react-native-camera";

export default function App() {
  let camera: RNCamera;
  let [faceDetectionEnabled, setFaceDetectionEnabled] = React.useState<boolean>(
    false
  );
  let [peopleDetected, setPeopleDetected] = React.useState<boolean>(false);

  let cameraReady = () => {
    console.log("camera ready");
    setFaceDetectionEnabled(true);
  };

  let onFacesDetected = ({ faces }: { faces: Face[] }) => {
    setPeopleDetected(!!faces.length);
  };

  let onFaceDetectionError = () => {
    console.log("Face error");
    setPeopleDetected(false);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={(ref: RNCamera) => (camera = ref)}
        type={RNCamera.Constants.Type.front}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
        onCameraReady={cameraReady}
        onFacesDetected={faceDetectionEnabled ? onFacesDetected : undefined}
        onFaceDetectionError={onFaceDetectionError}
        style={{ flex: 1 }}
      >
        {peopleDetected && <Text>Coucou petite perruche</Text>}
        {!peopleDetected && <Text>Au revoir</Text>}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
