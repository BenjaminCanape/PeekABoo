import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { connect } from "react-redux";
import { changeHighScore } from "../Stores/Reducers/highScoreReducer";

const mapStateToProps = (state: any) => {
  return { highScore: state.changeHighScore.highScore };
};

export default connect(mapStateToProps)(function ScoreBoard(props: any) {
  let score: number = props.navigation.getParam("score");

  React.useEffect(() => {
    setHighScore(score);
  }, []);

  let setHighScore = (score: number) => {
    const action = { type: "SET_HIGHSCORE", value: score };
    props.dispatch(action);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <Text>Score: {score} </Text>
        <Text>Record: {props.highScore} </Text>
        <Button
          title="Recommencer"
          onPress={() => props.navigation.navigate("StartMenu")}
        ></Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
