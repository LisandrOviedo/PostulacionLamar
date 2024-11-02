import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import empleados from "./empleados/empleadosSlices";
import movimientos from "./movimientos/movimientosSlices";
import roles from "./roles/rolesSlices";
import sugerencias from "./sugerencias/sugerenciasSlices";
import tipos_sugerencias from "./tiposSugerencias/tiposSugerenciasSlices";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["empleados"],
};

// Combinar el userReducer con Redux Persist
const rootReducer = combineReducers({
  empleados: empleados,
  movimientos: movimientos,
  roles: roles,
  sugerencias: sugerencias,
  tipos_sugerencias: tipos_sugerencias,
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
