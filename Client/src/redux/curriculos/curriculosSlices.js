import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curriculos: {},
  curriculoEmpleado: {},
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    cedula: "",
    apellidos: "",
    area_interes_id: "",
    estado: "",
    idioma_id: "",
    orden_campo: "",
    orden_por: "",
    empresa_id: "",
  },
};

export const curriculoSlice = createSlice({
  name: "curriculos",
  initialState,
  reducers: {
    allCurriculos: (state, action) => {
      state.curriculos = action.payload;
    },
    curriculoEmpleado: (state, action) => {
      state.curriculoEmpleado = action.payload;
    },
    curriculoDetail: (state, action) => {
      state.curriculoEmpleado = action.payload;
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
        area_interes_id: "",
        estado: "",
        idioma_id: "",
        empresa_id: state.filtros.empresa_id,
      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  allCurriculos,
  curriculoEmpleado,
  curriculoDetail,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = curriculoSlice.actions;
export default curriculoSlice.reducer;
