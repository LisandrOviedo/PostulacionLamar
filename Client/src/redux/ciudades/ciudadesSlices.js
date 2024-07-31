import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ciudades_activas: [],
};

export const ciudadesSlice = createSlice({
  name: "ciudades",
  initialState,
  reducers: {
    allCiudadesActivas: (state, action) => {
      state.ciudades_activas = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allCiudadesActivas, resetState } = ciudadesSlice.actions;
export default ciudadesSlice.reducer;
