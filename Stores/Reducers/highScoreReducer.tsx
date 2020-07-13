const initialState = { highScore: 0 };

export function changeHighScore(state: any = initialState, action: any) {
  switch (action.type) {
    case "SET_HIGHSCORE":
      let nextState;
      if (state.highScore <= action.value) {
        return (nextState = {
          ...state,
          highScore: action.value,
        });
      } else {
        return state;
      }
    default:
      return state;
  }
}
