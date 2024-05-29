import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prueba_kostick: [],
  pruebas_empleados: [],
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    cedula: "",
    apellidos: "",
    orden_campo: "",
    orden_por: "",
  },
};

export const pruebasEmpleadosSlice = createSlice({
  name: "pruebas_empleados",
  initialState,
  reducers: {
    prueba_kostick: (state, action) => {
      state.prueba_kostick = action.payload;
    },
    pruebas_empleados: (state, action) => {
      state.pruebas_empleados = action.payload;
    },
    paginaActual: (state, action) => {
      state.paginaActual = action.payload;
    },
    limitePorPagina: (state, action) => {
      state.limitePorPagina = action.payload;
    },
    filtros: (state, action) => {
      state.filtros = action.payload;
    },
    resetFilters: (state) => {
      state.filtros = {
        cedula: "",
        apellidos: "",
        orden_campo: "",
        orden_por: "",
      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  prueba_kostick,
  pruebas_empleados,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = pruebasEmpleadosSlice.actions;
export default pruebasEmpleadosSlice.reducer;
