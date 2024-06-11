import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import areas_interes from "./areasInteres/areasInteresSlices";
import curriculos from "./curriculos/curriculosSlices";
import empleados from "./empleados/empleadosSlices";
import etnias from "./etnias/etniasSlices";
import idiomas from "./idiomas/idiomasSlices";
import pruebas_empleados from "./pruebasEmpleados/pruebasEmpleadosSlices";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["curriculos", "empleados", "pruebas_empleados"],
};

// Combinar el userReducer con Redux Persist
const rootReducer = combineReducers({
  areas_interes: areas_interes,
  curriculos: curriculos,
  empleados: empleados,
  etnias: etnias,
  idiomas: idiomas,
  pruebas_empleados: pruebas_empleados,
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
