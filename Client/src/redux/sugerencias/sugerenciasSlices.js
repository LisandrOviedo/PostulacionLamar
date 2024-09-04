import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sugerencias: {},
  sugerenciaDetail: {},
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    empresa_id: "",
    sede_id: "",
    tipo_sugerencia_id: "",
    orden_campo: "",
    orden_por: "",
  },
};

export const sugerenciasSlice = createSlice({
  name: "sugerencias",
  initialState,
  reducers: {
    allSugerencias: (state, action) => {
      state.sugerencias = action.payload;
    },
    sugerenciaDetail: (state, action) => {
      state.sugerenciaDetail = action.payload;
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
        empresa_id: "",
        sede_id: "",
        tipo_sugerencia_id: "",
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
  allSugerencias,
  sugerenciaDetail,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = sugerenciasSlice.actions;
export default sugerenciasSlice.reducer;
