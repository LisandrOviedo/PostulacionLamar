import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empleados: [],
  empleado: {},
  cargo_actual: [],
};

export const empleadoSlice = createSlice({
  name: "empleados",
  initialState,
  reducers: {
    allEmpleados: (state, action) => {
      state.empleados = action.payload.empleados;
    },
    createEmpleado: (state, action) => {
      state.empleado = action.payload;
    },
    empleadoByID: (state, action) => {
      state.empleado = action.payload;
    },
    cargoActualEmpleado: (state, action) => {
      state.cargo_actual = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  allEmpleados,
  createEmpleado,
  empleadoByID,
  cargoActualEmpleado,
  resetState,
} = empleadoSlice.actions;
export default empleadoSlice.reducer;
