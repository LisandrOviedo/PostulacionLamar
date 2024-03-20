import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import curriculos from "./curriculos/curriculoSlice";
import empleado from "./empleados/empleadoSlice";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["curriculos", "empleados"],
};

// Combinar el userReducer con Redux Persist
const rootReducer = combineReducers({
  curriculos: curriculos,
  empleado: empleado,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: persistedReducer,
});

// Configuración del persistor de Redux Persist
export const persistor = persistStore(store);
