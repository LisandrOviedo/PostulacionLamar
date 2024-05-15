import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import curriculos from "./curriculos/curriculoSlice";
import empleados from "./empleados/empleadoSlice";
import areas_interes from "./areasinteres/areainteresSlice";
import prueba_kostick from "./pruebaKostick/pruebaSlice";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["empleados", "curriculos", "prueba_kostick"],
};

// Combinar el userReducer con Redux Persist
const rootReducer = combineReducers({
  curriculos: curriculos,
  empleados: empleados,
  areas_interes: areas_interes,
  prueba_kostick: prueba_kostick,
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
