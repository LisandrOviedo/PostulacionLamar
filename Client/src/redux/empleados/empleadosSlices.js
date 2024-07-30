import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  empleados: {},
  empleado: {},
  empleadoDetail: {},
  documentos: [],
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    numero_identificacion: "",
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
    token: (state, action) => {
      state.token = action.payload;
    },
    allEmpleados: (state, action) => {
      state.empleados = action.payload;
    },
    empleadoLogin: (state, action) => {
      state.empleado = action.payload;
    },
    empleadoDetail: (state, action) => {
      state.empleadoDetail = action.payload;
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
        numero_identificacion: "",
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
  token,
  allEmpleados,
  empleadoLogin,
  empleadoDetail,
  allDocumentos,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = empleadoSlice.actions;
export default empleadoSlice.reducer;
