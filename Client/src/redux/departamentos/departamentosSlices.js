import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departamentos_activos: [],
};

export const departamentosSlice = createSlice({
  name: "departamentos",
  initialState,
  reducers: {
    allDepartamentosActivos: (state, action) => {
      state.departamentos_activos = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allDepartamentosActivos, resetState } =
  departamentosSlice.actions;
export default departamentosSlice.reducer;
