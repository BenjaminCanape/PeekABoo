import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RNCamera, Face } from "react-native-camera";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Game extends Component<
  { navigation: NavigationScreenProp<NavigationState, NavigationParams> },
  { faceDetectionEnabled: boolean; isCurrentPeekABoo: boolean }
> {
  camera: RNCamera | null = null;
  peopleDetected: boolean = false;
  score: number = 0;

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

  peekABoo = (waitingTime: number) => {
    this.setState({ isCurrentPeekABoo: true });

    if (!this.peopleDetected) {
      this.props.navigation.navigate("ScoreBoard", { score: this.score });
    }

    setTimeout(() => {
      if (!this.peopleDetected) {
        this.score += waitingTime;
        this.manageGame(randomInteger(3000, 10000));
      } else {
        this.props.navigation.navigate("ScoreBoard", { score: this.score });
      }
    }, randomInteger(1000, 3000));
  };

  manageGame = (waitingTimeBeforePeekABoo: number) => {
    this.setState({ isCurrentPeekABoo: false });
    setTimeout(
      () => this.peekABoo(waitingTimeBeforePeekABoo),
      waitingTimeBeforePeekABoo
    );
  };

  componentDidMount() {
    this.manageGame(randomInteger(3000, 10000));
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
          <Text>Regardez l'écran jusqu'au "BOO", ensuite cachez-vous</Text>
          <Text style={styles.score}>Score: {this.score}</Text>
          {isCurrentPeekABoo && (
            <View style={styles.alertBox}>
              <Text style={styles.alertMessage}>BOOOOOOO</Text>
            </View>
          )}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  score: {
    textAlign: "right",
    marginRight: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
  alertBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  alertMessage: {
    fontSize: 64,
  },
});
