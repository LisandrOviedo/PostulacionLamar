import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cargosNiveles: [],
};

export const cargosNivelesSlice = createSlice({
  name: "cargosNiveles",
  initialState,
  reducers: {
    allCargosNivelesActivos: (state, action) => {
      state.cargosNiveles = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allCargosNivelesActivos, resetState } =
  cargosNivelesSlice.actions;
export default cargosNivelesSlice.reducer;
