import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  empleados: {},
  empleado: {},
  empleadoDetail: {},
  cargo_actual: [],
  documentos: [],
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

export const empleadoSlice = createSlice({
  name: "empleados",
  initialState,
  reducers: {
    allEmpleados: (state, action) => {
      state.empleados = action.payload;
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
    allDocumentos: (state, action) => {
      state.documentos = action.payload;
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
  allEmpleados,
  createEmpleado,
  empleadoByID,
  cargoActualEmpleado,
  allDocumentos,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = empleadoSlice.actions;
export default empleadoSlice.reducer;
