import React from "react";
import { StyleSheet, View, Button } from "react-native";

export default function StartMenu(props: any) {
  let startGame = () => {
    props.navigation.navigate("Game");
  };

  return (
    <View style={styles.mainContainer}>
      <Button title="Jouer" onPress={startGame}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
