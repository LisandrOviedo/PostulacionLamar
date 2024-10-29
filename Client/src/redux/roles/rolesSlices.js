import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roles: [],
    rol: null, // Inicialmente no hay rol cargado
    paginaActual: 1,
    limitePorPagina: 2,
    filtros: {
        nombre: "",
        descripcion: "",
    },
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        allRoles: (state, action) => {
            state.roles = action.payload; // Actualiza el estado con todos los roles
        },
        detallesRol: (state, action) => {
            state.rol = action.payload; // Actualiza el rol con los detalles
        },
        paginaActual: (state, action) => {
            state.paginaActual = action.payload; // Actualiza la página actual
        },
        limitePorPagina: (state, action) => {
            state.limitePorPagina = action.payload; // Actualiza el límite por página
        },
        filtros: (state, action) => {
            state.filtros = action.payload; // Actualiza los filtros
        },
        resetFilters: (state) => {
            state.filtros = {
                nombre: "",
                descripcion: "",
            }; // Resetea los filtros a su estado inicial
        },
        resetState: () => {
            return initialState; // Resetea el estado a su valor inicial
        },
    },
});

// Exporta las acciones
export const {
    allRoles,
    detallesRol,
    paginaActual,
    limitePorPagina,
    filtros,
    resetFilters,
    resetState,
} = rolesSlice.actions;

// Exporta el reducer
export default rolesSlice.reducer;