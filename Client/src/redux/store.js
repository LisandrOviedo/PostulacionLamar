import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import curriculos from "./curriculos/curriculosSlices";
import empleados from "./empleados/empleadosSlices";
import movimientos from "./movimientos/movimientosSlices";
import pruebas_empleados from "./pruebasEmpleados/pruebasEmpleadosSlices";
import roles from "./roles/rolesSlices";
import sugerencias from "./sugerencias/sugerenciasSlices";
import tipos_sugerencias from "./tiposSugerencias/tiposSugerenciasSlices";
import vacantes from "./vacantes/vacantesSlices";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["empleados"],
};

// Combinar el userReducer con Redux Persist
const rootReducer = combineReducers({
  curriculos: curriculos,
  empleados: empleados,
  movimientos: movimientos,
  pruebas_empleados: pruebas_empleados,
  roles: roles,
  sugerencias: sugerencias,
  tipos_sugerencias: tipos_sugerencias,
  vacantes: vacantes,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

// Configuración del persistor de Redux Persist
export const persistor = persistStore(store);
