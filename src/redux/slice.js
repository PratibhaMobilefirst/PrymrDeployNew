import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
};

const slice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
  },
});

export const { setBoards } = slice.actions;
export default slice.reducer;
