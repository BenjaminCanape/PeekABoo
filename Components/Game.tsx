import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { RNCamera, Face } from "react-native-camera";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";

import I18n from "../i18n/i18n";

import Sound from "react-native-sound";

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Game extends Component<
  { navigation: NavigationScreenProp<NavigationState, NavigationParams> },
  {
    faceDetectionEnabled: boolean;
    isCurrentPeekABoo: boolean;
    monsterArrives: boolean;
  }
> {
  camera: RNCamera | null = null;
  peopleDetected: boolean = false;
  score: number = 0;
  booSound: Sound = new Sound("boo.mp3");

  constructor(props: any) {
    super(props);
    this.state = {
      faceDetectionEnabled: false,
      isCurrentPeekABoo: false,
      monsterArrives: false,
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

  gameOver = () => {
    this.booSound.release();
    this.props.navigation.navigate("ScoreBoard", { score: this.score });
  };

  peekABoo = (waitingTime: number) => {
    this.setState({ monsterArrives: true });

    if (!this.peopleDetected) {
      setTimeout(() => this.gameOver(), 1000);
    }

    setTimeout(() => {
      this.setState({ isCurrentPeekABoo: true, monsterArrives: false });
      this.booSound.play(() => {
        if (!this.peopleDetected) {
          this.score += waitingTime;
          setTimeout(() => this.manageGame(randomInteger(3000, 10000)), 5000);
        } else {
          setTimeout(() => this.gameOver(), 1000);
        }
      });
    }, randomInteger(2000, 4000));
  };

  manageGame = (waitingTimeBeforePeekABoo: number) => {
    this.setState({ isCurrentPeekABoo: false, monsterArrives: false });
    setTimeout(
      () => this.peekABoo(waitingTimeBeforePeekABoo),
      waitingTimeBeforePeekABoo
    );
  };

  componentDidMount() {
    this.manageGame(randomInteger(3000, 10000));
  }

  render() {
    const {
      faceDetectionEnabled,
      isCurrentPeekABoo,
      monsterArrives,
    } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref: RNCamera) => (this.camera = ref)}
          type={RNCamera.Constants.Type.front}
          onCameraReady={this.cameraReady}
          onFacesDetected={
            faceDetectionEnabled ? this.onFacesDetected : undefined
          }
          onFaceDetectionError={this.onFaceDetectionError}
          style={styles.screen}
        >
          <View style={styles.printedScreen}>
            <View style={styles.header}>
              <Text>{I18n.t("rule")}</Text>
              <Text style={styles.score}>
                {I18n.t("score")}: {this.score}
              </Text>
            </View>
            <View style={styles.body}>
              {isCurrentPeekABoo ? (
                <Image
                  style={styles.monsterPicture}
                  source={require("../assets/monster_landscape.png")}
                ></Image>
              ) : (
                <Image
                  style={styles.monsterPicture}
                  source={require("../assets/landscape.png")}
                ></Image>
              )}
            </View>
            <View style={styles.bottom}>
              {monsterArrives && (
                <View style={styles.alertBox}>
                  <Text style={styles.alertMessage}>{I18n.t("arrives")}</Text>
                </View>
              )}
              {isCurrentPeekABoo && (
                <View style={styles.alertBox}>
                  <Text style={styles.alertMessage}>BOOOOO</Text>
                </View>
              )}
            </View>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  printedScreen: {
    flex: 1,
    backgroundColor: "white",
  },
  screen: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
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
  monsterPicture: {
    width: 350,
    height: 400,
  },
});
