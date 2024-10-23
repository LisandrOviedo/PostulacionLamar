import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  rol:[], //revisar esto despues por si me da error
  paginaActual: 1,
  limitePorPagina: 2,
  filtros: {
    nombre: "",
    descripcion: "",
   
  },
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    allRoles: (state, action) => {
      state.roles = action.payload;
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
        nombre: "",
        descripcion: "",
      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const rolSlice = createSlice({
  name: "rol",
  initialState,
  reducers: {
    detalles: (state, action) => {
      state.rol = action.payload;
    },
  },
});

export const {
  allRoles,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
  Rol
  
} = rolesSlice.actions;
export default rolesSlice.reducer;
