import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import curriculos from "./curriculos/curriculoSlice";
import empleado from "./empleados/empleadoSlice";
import cargo_actual from "./empleados/empleadoSlice";
import areas_interes from "./areasinteres/areainteresSlice";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["empleado", "cargo_actual"],
};

// Combinar el userReducer con Redux Persist
const rootReducer = combineReducers({
  curriculos: curriculos,
  empleado: empleado,
  cargo_actual: cargo_actual,
  areas_interes: areas_interes,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configuración del persistor de Redux Persist
export const persistor = persistStore(store);
