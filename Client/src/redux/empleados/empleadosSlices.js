import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  empleado: {},
};

export const empleadoSlice = createSlice({
  name: "empleados",
  initialState,
  reducers: {
    token: (state, action) => {
      state.token = action.payload;
    },
    empleadoLogin: (state, action) => {
      state.empleado = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { token, empleadoLogin, resetState } = empleadoSlice.actions;
export default empleadoSlice.reducer;
