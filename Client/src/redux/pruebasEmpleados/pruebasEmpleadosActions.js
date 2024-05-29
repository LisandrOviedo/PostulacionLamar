import axios from "axios";

import Swal from "sweetalert2";

import {
  pruebas_empleados,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} from "./pruebasEmpleadosSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const postPruebaEmpleado = async (token, empleado_id, prueba) => {
  const URL_CREATE_PRUEBA = `${URL_SERVER}/pruebas_empleados`;

  try {
    const { data } = await axios.post(
      URL_CREATE_PRUEBA,
      { empleado_id: empleado_id, prueba: prueba },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getAllPruebasEmpleados = (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_RESPUESTAS_EMPLEADOS = `${URL_SERVER}/pruebas_empleados/allPruebasEmpleados`;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        URL_ALL_RESPUESTAS_EMPLEADOS,
        {
          filtros,
          paginaActual,
          limitePorPagina,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      return dispatch(pruebas_empleados(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const postPaginaActual = (pagina_actual) => {
  return async (dispatch) => {
    try {
      return dispatch(paginaActual(pagina_actual));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const postLimitePorPagina = (limite_pagina) => {
  return async (dispatch) => {
    try {
      return dispatch(limitePorPagina(limite_pagina));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const postFiltros = (filters) => {
  return async (dispatch) => {
    try {
      return dispatch(filtros(filters));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const deleteFiltros = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetFilters());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const resetPruebas = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
