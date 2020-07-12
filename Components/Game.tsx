import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RNCamera, Face } from "react-native-camera";

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Game extends Component {
  camera: RNCamera | null = null;
  peopleDetected: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      faceDetectionEnabled: false,
      isCurrentPeekABoo: false,
    };
  }

  cameraReady = () => {
    this.setState({ faceDetectionEnabled: true });
  };

  onFacesDetected = ({ faces }: { faces: Face[] }) => {
    this.peopleDetected = !!faces.length;
  };

  onFaceDetectionError = () => {
    this.peopleDetected = false;
  };

  peekABoo = () => {
    this.setState({ isCurrentPeekABoo: true });
    setTimeout(() => {
      let won: boolean = false;
      if (!this.peopleDetected) {
        won = true;
      }
      this.props.navigation.navigate("ScoreBoard", { won: won });
    }, randomInteger(1, 3000));
  };

  manageGame = (waitingTimeBeforePeekABoo: number) => {
    setTimeout(() => this.peekABoo(), waitingTimeBeforePeekABoo);
  };

  componentDidMount() {
    this.manageGame(randomInteger(1, 10000));
  }

  render() {
    const { faceDetectionEnabled, isCurrentPeekABoo } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref: RNCamera) => (this.camera = ref)}
          type={RNCamera.Constants.Type.front}
          faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
          onCameraReady={this.cameraReady}
          onFacesDetected={
            faceDetectionEnabled ? this.onFacesDetected : undefined
          }
          onFaceDetectionError={this.onFaceDetectionError}
          style={styles.screen}
        >
          {isCurrentPeekABoo && <Text>Cachez vous, j'arrive</Text>}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  screen: {
    flex: 1,
    display: "flex",
  },
});
