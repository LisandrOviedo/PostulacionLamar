import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import areas_interes from "./areasInteres/areasInteresSlices";
import cargos from "./cargos/cargosSlices";
import cargos_niveles from "./cargosNiveles/cargosNivelesSlices";
import clases_movimientos from "./clasesMovimientos/clasesMovimientosSlices";
import curriculos from "./curriculos/curriculosSlices";
import departamentos from "./departamentos/departamentosSlices";
import empleados from "./empleados/empleadosSlices";
import empresas from "./empresas/empresasSlices";
import estados from "./estados/estadosSlices";
import idiomas from "./idiomas/idiomasSlices";
import movimientos from "./movimientos/movimientosSlices";
import municipios from "./municipios/municipiosSlices";
import paises from "./paises/paisesSlices";
import parroquias from "./parroquias/parroquiasSlices";
import pruebas_empleados from "./pruebasEmpleados/pruebasEmpleadosSlices";
import roles from "./roles/rolesSlices";
import sedes from "./sedes/sedesSlices";
import sugerencias from "./sugerencias/sugerenciasSlices";
import tipos_sugerencias from "./tiposSugerencias/tiposSugerenciasSlices";
import vacantes from "./vacantes/vacantesSlices";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["curriculos", "empleados", "pruebas_empleados"],
};

// Combinar el userReducer con Redux Persist
const rootReducer = combineReducers({
  areas_interes: areas_interes,
  cargos: cargos,
  cargos_niveles: cargos_niveles,
  clases_movimientos: clases_movimientos,
  curriculos: curriculos,
  departamentos: departamentos,
  empleados: empleados,
  empresas: empresas,
  estados: estados,
  idiomas: idiomas,
  movimientos: movimientos,
  municipios: municipios,
  paises: paises,
  parroquias: parroquias,
  pruebas_empleados: pruebas_empleados,
  roles: roles,
  sedes: sedes,
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
