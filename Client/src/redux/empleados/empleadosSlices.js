import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  empleados: {},
  empleado: {},
  empleadoDetail: {},
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    numero_identificacion: "",
    apellidos: "",
    activo: "",
    orden_campo: "",
    orden_por: "",
    empresa_id: "",
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
        empresa_id: state.filtros.empresa_id,
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
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = empleadoSlice.actions;
export default empleadoSlice.reducer;
