import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empleado: [],
};

export const empleadoSlice = createSlice({
  name: "empleado",
  initialState,
  reducers: {
    login: (state, action) => {
      state.empleado = action.payload;
    },
  },
});

export const { login } = empleadoSlice.actions;
export default empleadoSlice.reducer;
