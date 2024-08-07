import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empresas: [],
};

export const empresasSlice = createSlice({
  name: "empresas",
  initialState,
  reducers: {
    allEmpresasActivos: (state, action) => {
      state.empresas = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allEmpresasActivos, resetState } = empresasSlice.actions;
export default empresasSlice.reducer;
