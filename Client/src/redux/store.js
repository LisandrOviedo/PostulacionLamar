import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import areas_interes from "./areasInteres/areasInteresSlices";
import ciudades from "./ciudades/ciudadesSlices";
import curriculos from "./curriculos/curriculosSlices";
import empleados from "./empleados/empleadosSlices";
import estados from "./estados/estadosSlices";
import etnias from "./etnias/etniasSlices";
import idiomas from "./idiomas/idiomasSlices";
import municipios from "./municipios/municipiosSlices";
import paises from "./paises/paisesSlices";
import parroquias from "./parroquias/parroquiasSlices";
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
  ciudades: ciudades,
  curriculos: curriculos,
  empleados: empleados,
  estados: estados,
  etnias: etnias,
  idiomas: idiomas,
  municipios: municipios,
  paises: paises,
  parroquias: parroquias,
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
