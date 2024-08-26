import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sugerencias_pred_activas: [],
};

export const sugerenciasPredSlices = createSlice({
  name: "sugerencias_pred",
  initialState,
  reducers: {
    allSugerenciasPredActivas: (state, action) => {
      state.sugerencias_pred_activas = action.payload;
    },
    resetStateSugerenciasPredActivas: (state, action) => {
      state.sugerencias_pred_activas = [];
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  allSugerenciasPredActivas,
  resetStateSugerenciasPredActivas,
  resetState,
} = sugerenciasPredSlices.actions;
export default sugerenciasPredSlices.reducer;
