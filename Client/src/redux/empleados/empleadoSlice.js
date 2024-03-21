import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empleado: [],
  cargo_actual: [],
};

export const cargoActualSlice = createSlice({
  name: "cargo_actual",
  initialState,
  reducers: {
    login: (state, action) => {
      state.empleado = action.payload;
    },
    cargoActual: (state, action) => {
      state.cargo_actual = action.payload;
    },
  },
});

export const { login, cargoActual } = cargoActualSlice.actions;
export default cargoActualSlice.reducer;
