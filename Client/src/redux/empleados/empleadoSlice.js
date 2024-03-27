import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empleado: [],
  allEmpleados: [],
  cargo_actual: [],
};

export const empleadoSlice = createSlice({
  name: "empleados",
  initialState,
  reducers: {
    empleado: (state, action) => {
      state.empleado = action.payload;
    },
    cargoActual: (state, action) => {
      state.cargo_actual = action.payload;
    },
  },
});

export const { empleado, cargoActual } = empleadoSlice.actions;
export default empleadoSlice.reducer;
