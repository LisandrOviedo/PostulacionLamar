import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prueba_kostick: [],
  empleados_pruebas: [],
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    cedula: "",
    apellidos: "",
    activo: "",
    orden_campo: "",
    orden_por: "",
  },
};

export const pruebaSlice = createSlice({
  name: "prueba_kostick",
  initialState,
  reducers: {
    prueba: (state, action) => {
      state.prueba_kostick = action.payload;
    },
    empleados_prueba: (state, action) => {
      state.empleados_pruebas = action.payload;
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
        activo: "",
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
  prueba,
  empleados_prueba,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = pruebaSlice.actions;
export default pruebaSlice.reducer;
