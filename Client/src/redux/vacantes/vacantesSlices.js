import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vacantes: [],
  paginaActual: 1,
  limitePorPagina: 2,
  paginaActualDetail: 1,
  limitePorPaginaDetail: 2,
  filtros: {
    buscar_por: "",
    buscar: "",
    activo: "",
    area_interes_id: "",
    orden_campo: "",
    orden_por: "",
  },
  filtrosDetail: {
    buscar_por: "",
    buscar: "",
    activo: "",
    orden_campo: "",
    orden_por: "",
  },
};

export const vacanteSlice = createSlice({
  name: "vacantes",
  initialState,
  reducers: {
    allVacantes: (state, action) => {
      state.vacantes = action.payload;
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
    paginaActualDetail: (state, action) => {
      state.paginaActualDetail = action.payload;
    },
    limitePorPaginaDetail: (state, action) => {
      state.limitePorPaginaDetail = action.payload;
    },
    filtrosDetail: (state, action) => {
      state.filtrosDetail = action.payload;
    },
    resetFilters: (state) => {
      state.filtros = {
        buscar_por: "",
        buscar: "",
        activo: "",
        area_interes_id: "",
        orden_campo: "",
        orden_por: "",
      };
    },
    resetFiltersDetail: (state) => {
      state.filtrosDetail = {
        buscar_por: "",
        buscar: "",
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
  allVacantes,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  paginaActualDetail,
  limitePorPaginaDetail,
  filtrosDetail,
  resetFiltersDetail,
  resetState,
} = vacanteSlice.actions;
export default vacanteSlice.reducer;
