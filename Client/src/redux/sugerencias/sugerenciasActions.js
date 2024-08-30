import axios from "axios";

import Swal from "sweetalert2";

import {
  allSugerencias,
  sugerenciaDetail,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} from "./sugerenciasSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllSugerencias = (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_SUGERENCIAS = `${URL_SERVER}/sugerencias/allSugerencias`;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        URL_ALL_SUGERENCIAS,
        {
          filtros,
          paginaActual,
          limitePorPagina,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      return dispatch(allSugerencias(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const getSugerenciasActivasNoRevisadas = () => {
  const URL_SUGERENCIAS_ACTIVAS_NO_REVISADAS = `${URL_SERVER}/sugerencias/activasNoRevisadas`;

  return async () => {
    try {
      const { data } = await axios(URL_SUGERENCIAS_ACTIVAS_NO_REVISADAS);

      return data;
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const getSugerencia = (token, sugerencia_id) => {
  const URL_SUGERENCIA_DETALLE = `${URL_SERVER}/sugerencias/detalle/${sugerencia_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_SUGERENCIA_DETALLE, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(sugerenciaDetail(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const postSugerencia = (sugerencia) => {
  const URL_POST_SUGERENCIA = `${URL_SERVER}/sugerencias`;

  return async () => {
    try {
      await axios.post(`${URL_POST_SUGERENCIA}`, sugerencia);

      return Swal.fire({
        text: "¡Sugerencia enviada exitosamente!",
        icon: "success",
        showConfirmButton: true,
      });
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

export const resetSugerencias = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
