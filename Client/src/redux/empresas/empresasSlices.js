import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empresas: [],
};

export const empresasSlice = createSlice({
  name: "empresas",
  initialState,
  reducers: {
    allEmpresasActivas: (state, action) => {
      state.empresas = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allEmpresasActivas, resetState } = empresasSlice.actions;
export default empresasSlice.reducer;
