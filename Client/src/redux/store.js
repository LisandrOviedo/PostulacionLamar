import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import areas_interes from "./areasInteres/areasInteresSlices";
import curriculos from "./curriculos/curriculosSlices";
import empleados from "./empleados/empleadosSlices";
import idiomas from "./idiomas/idiomasSlices";
import prueba_kostick from "./pruebasKostick/pruebasKostickSlices";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["curriculos", "empleados", "prueba_kostick"],
};

// Combinar el userReducer con Redux Persist
const rootReducer = combineReducers({
  areas_interes: areas_interes,
  curriculos: curriculos,
  empleados: empleados,
  idiomas: idiomas,
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
