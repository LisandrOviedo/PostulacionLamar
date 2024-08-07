import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cargos: [],
};

export const cargosSlice = createSlice({
  name: "cargos",
  initialState,
  reducers: {
    allCargosActivos: (state, action) => {
      state.cargos = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allCargosActivos, resetState } = cargosSlice.actions;
export default cargosSlice.reducer;
