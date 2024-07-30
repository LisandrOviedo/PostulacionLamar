import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  estados_activos: [],
};

export const estadosSlice = createSlice({
  name: "estados",
  initialState,
  reducers: {
    allEstadosActivos: (state, action) => {
      state.estados_activos = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allEstadosActivos, resetState } = estadosSlice.actions;
export default estadosSlice.reducer;
