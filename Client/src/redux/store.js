import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import empleados from "./empleados/empleadosSlices";
import roles from "./roles/rolesSlices";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["empleados"],
};

// Combinar el userReducer con Redux Persist
const rootReducer = combineReducers({
  empleados: empleados,
  roles: roles,
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
