import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cargos_niveles_activos: [],
};

export const cargosNivelesSlice = createSlice({
  name: "cargosNiveles",
  initialState,
  reducers: {
    allCargosNivelesActivos: (state, action) => {
      state.cargos_niveles_activos = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allCargosNivelesActivos, resetState } =
  cargosNivelesSlice.actions;
export default cargosNivelesSlice.reducer;
