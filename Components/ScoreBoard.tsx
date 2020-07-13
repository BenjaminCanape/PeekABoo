import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { connect } from "react-redux";
import { changeHighScore } from "../Stores/Reducers/highScoreReducer";
import I18n from "../i18n/i18n";

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
      <Text>
        {I18n.t("score")}: {score}
      </Text>
      <Text>
        {I18n.t("highScore")}: {props.highScore}
      </Text>
      <Button
        title={I18n.t("restart")}
        onPress={() => props.navigation.navigate("StartMenu")}
      ></Button>
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
