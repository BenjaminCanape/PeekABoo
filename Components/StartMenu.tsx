import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";

export default function StartMenu(props: any) {
  let startGame = () => {
    props.navigation.navigate("Game");
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>One Boo Three</Text>
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
  title: {
    fontSize: 32,
    marginTop: 0,
    marginBottom: 50,
  },
});
