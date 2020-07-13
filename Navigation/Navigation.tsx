import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StartMenu from "../Components/StartMenu";
import Game from "../Components/Game";
import ScoreBoard from "../Components/ScoreBoard";

const GameStackNavigator = createStackNavigator({
  StartMenu: {
    screen: StartMenu,
    navigationOptions: {
      headerShown: false,
    },
  },
  Game: {
    screen: Game,
    navigationOptions: {
      headerShown: false,
    },
  },
  ScoreBoard: {
    screen: ScoreBoard,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(GameStackNavigator);
