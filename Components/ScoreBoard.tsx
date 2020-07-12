import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function ScoreBoard(props: any) {
  let won: boolean = props.navigation.getParam("won");

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        {won ? <Text>Gagné</Text> : <Text>Perdu</Text>}
        <Button
          title="Recommencer"
          onPress={() => props.navigation.navigate("StartMenu")}
        ></Button>
      </View>
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
