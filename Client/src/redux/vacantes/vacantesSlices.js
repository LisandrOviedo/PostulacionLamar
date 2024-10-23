import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vacantes: [],
  vacanteDetail: {},
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    orden_campo: "",
    orden_por: "",
    empresa_id: "",
  },
};

export const vacanteSlice = createSlice({
  name: "vacantes",
  initialState,
  reducers: {
    allVacantes: (state, action) => {
      state.vacantes = action.payload;
    },
    vacanteDetail: (state, action) => {
      state.vacanteDetail = action.payload;
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
  allVacantes,
  vacanteDetail,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = vacanteSlice.actions;
export default vacanteSlice.reducer;
