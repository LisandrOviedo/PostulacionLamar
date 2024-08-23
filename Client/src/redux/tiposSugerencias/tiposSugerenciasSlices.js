import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tipos_sugerencias_activas: [],
};

export const tiposSugerenciasSlices = createSlice({
  name: "tipos_sugerencias",
  initialState,
  reducers: {
    allTiposSugerenciasActivas: (state, action) => {
      state.tipos_sugerencias_activas = action.payload;
    },
    resetStateTiposSugerenciasActivas: (state, action) => {
      state.tipos_sugerencias_activas = [];
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  allTiposSugerenciasActivas,
  resetStateTiposSugerenciasActivas,
  resetState,
} = tiposSugerenciasSlices.actions;
export default tiposSugerenciasSlices.reducer;
