import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departamentos: [],
};

export const departamentosSlice = createSlice({
  name: "departamentos",
  initialState,
  reducers: {
    allDepartamentosActivos: (state, action) => {
      state.departamentos = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allDepartamentosActivos, resetState } =
  departamentosSlice.actions;
export default departamentosSlice.reducer;
