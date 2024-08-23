import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sedes_activas: [],
};

export const sedesSlice = createSlice({
  name: "sedes",
  initialState,
  reducers: {
    allSedesActivas: (state, action) => {
      state.sedes_activas = action.payload;
    },
    resetStateSedesActivas: (state, action) => {
      state.sedes_activas = [];
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allSedesActivas, resetStateSedesActivas, resetState } =
  sedesSlice.actions;
export default sedesSlice.reducer;
