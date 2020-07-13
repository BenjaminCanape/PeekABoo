import { createStore } from "redux";
import { changeHighScore } from "./Reducers/highScoreReducer";
import { persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export default createStore(
  persistCombineReducers(rootPersistConfig, {
    changeHighScore,
  })
);
