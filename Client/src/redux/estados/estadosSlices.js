import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  estados_nacimiento: [],
  estados_residencia: [],
};

export const estadosSlice = createSlice({
  name: "estados",
  initialState,
  reducers: {
    allEstadosNacimiento: (state, action) => {
      state.estados_nacimiento = action.payload;
    },
    allEstadosResidencia: (state, action) => {
      state.estados_residencia = action.payload;
    },
    resetStateEstadosNacimiento: (state) => {
      state.estados_nacimiento = [];
    },
    resetStateEstadosResidencia: (state) => {
      state.estados_residencia = [];
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  allEstadosNacimiento,
  allEstadosResidencia,
  resetStateEstadosNacimiento,
  resetStateEstadosResidencia,
  resetState,
} = estadosSlice.actions;
export default estadosSlice.reducer;
