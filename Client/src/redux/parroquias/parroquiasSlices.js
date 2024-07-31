import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parroquias_activas: [],
};

export const parroquiasSlice = createSlice({
  name: "parroquias",
  initialState,
  reducers: {
    allParroquiasActivas: (state, action) => {
      state.parroquias_activas = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allParroquiasActivas, resetState } = parroquiasSlice.actions;
export default parroquiasSlice.reducer;
