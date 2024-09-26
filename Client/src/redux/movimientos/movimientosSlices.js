import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movimientos: [],
  movimientoDetail: {},
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    numero_identificacion: "",
    apellidos: "",
    clase_movimiento_id: "",
    estado_solicitud: "",
    empresa_id: "",
    sede_id: "",
    orden_campo: "",
    orden_por: "",
  },
};

export const movimientoSlice = createSlice({
  name: "movimientos",
  initialState,
  reducers: {
    allMovimientos: (state, action) => {
      state.movimientos = action.payload;
    },
    movimientoDetail: (state, action) => {
      state.movimientoDetail = action.payload;
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
        clase_movimiento_id: "",
        estado_solicitud: "",
        empresa_id: "",
        sede_id: "",
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
  allMovimientos,
  movimientoDetail,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = movimientoSlice.actions;
export default movimientoSlice.reducer;
