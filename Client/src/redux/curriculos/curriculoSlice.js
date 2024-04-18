import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curriculos: {},
  curriculo: {},
  curriculoEmpleado: {},
  paginaActual: 1,
  limitePorPagina: 10,
  filtros: {
    cedula: "",
    apellidos: "",
    area_interes_id: "",
    estado: "",
  },
};

export const curriculoSlice = createSlice({
  name: "curriculos",
  initialState,
  reducers: {
    allCurriculos: (state, action) => {
      state.curriculos = action.payload;
    },
    createCurriculo: (state, action) => {
      state.curriculo = action.payload;
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
      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  allCurriculos,
  createCurriculo,
  curriculoEmpleado,
  curriculoDetail,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = curriculoSlice.actions;
export default curriculoSlice.reducer;
