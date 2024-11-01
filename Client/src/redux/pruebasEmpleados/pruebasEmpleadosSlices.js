import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pruebas_empleados: [],
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    cedula: "",
    apellidos: "",
    prueba: "",
    orden_campo: "",
    orden_por: "",
    empresa_id: "",
    fecha_desde: "",
    fecha_hasta: "",
  },
};

export const pruebasEmpleadosSlice = createSlice({
  name: "pruebas_empleados",
  initialState,
  reducers: {
    pruebas_empleados: (state, action) => {
      state.pruebas_empleados = action.payload;
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
        prueba: "",
        orden_campo: "",
        orden_por: "",
        empresa_id: state.filtros.empresa_id,
        fecha_desde: "",
        fecha_hasta: "",
      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  pruebas_empleados,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} = pruebasEmpleadosSlice.actions;
export default pruebasEmpleadosSlice.reducer;
