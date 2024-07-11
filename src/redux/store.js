import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slice";

const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

export default store;
