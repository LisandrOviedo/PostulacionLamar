import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prueba_kostick: [],
};

export const pruebaSlice = createSlice({
  name: "prueba_kostick",
  initialState,
  reducers: {
    prueba: (state, action) => {
      state.prueba_kostick = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { prueba, resetState } = pruebaSlice.actions;
export default pruebaSlice.reducer;
