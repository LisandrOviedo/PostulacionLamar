import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empresas_activas: [],
};

export const empresasSlice = createSlice({
  name: "empresas",
  initialState,
  reducers: {
    allEmpresasActivas: (state, action) => {
      state.empresas_activas = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allEmpresasActivas, resetState } = empresasSlice.actions;
export default empresasSlice.reducer;
