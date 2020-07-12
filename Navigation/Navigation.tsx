import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StartMenu from "../Components/StartMenu";
import Game from "../Components/Game";
import ScoreBoard from "../Components/ScoreBoard";

const GameStackNavigator = createStackNavigator({
  StartMenu: {
    screen: StartMenu,
    navigationOptions: {
      title: "Peek A Boo",
    },
  },
  Game: {
    screen: Game,
  },
  ScoreBoard: {
    screen: ScoreBoard,
  },
});

export default createAppContainer(GameStackNavigator);
