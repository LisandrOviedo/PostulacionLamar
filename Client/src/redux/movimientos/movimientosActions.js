import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

import {
  allMovimientos,
  movimientoDetail,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetMovimientoDetail,
  resetState,
} from "./movimientosSlices";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllMovimientos = (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_EMPLEADOS = `${URL_SERVER}/movimientos/allMovimientos`;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        URL_ALL_EMPLEADOS,
        {
          filtros,
          paginaActual,
          limitePorPagina,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      return dispatch(allMovimientos(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const getMovimientoDetail = (token, movimiento_id, empleado_id) => {
  const URL_MOVIMIENTO_DETAIL = `${URL_SERVER}/movimientos/detalle?movimiento_id=${movimiento_id}&empleado_id=${empleado_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_MOVIMIENTO_DETAIL, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(movimientoDetail(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const putAprobarMovimiento = async (
  token,
  movimiento_id,
  empleado_id,
  observaciones
) => {
  const URL_APROBAR_MOVIMIENTO = `${URL_SERVER}/movimientos/aprobar`;

  try {
    await axios.put(
      URL_APROBAR_MOVIMIENTO,
      {
        movimiento_id: movimiento_id,
        revisado_por_id: empleado_id,
        observaciones: observaciones,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return Swal.fire({
      text: "¡Movimiento aprobado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const putDenegarMovimiento = async (
  token,
  movimiento_id,
  empleado_id,
  observaciones
) => {
  const URL_DENEGAR_MOVIMIENTO = `${URL_SERVER}/movimientos/denegar`;

  try {
    await axios.put(
      URL_DENEGAR_MOVIMIENTO,
      {
        movimiento_id: movimiento_id,
        revisado_por_id: empleado_id,
        observaciones: observaciones,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return Swal.fire({
      text: "¡Movimiento denegado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const postMovimiento = async (token, datosMovimiento) => {
  const URL_POST_MOVIMIENTO = `${URL_SERVER}/movimientos`;

  try {
    await axios.post(URL_POST_MOVIMIENTO, datosMovimiento, {
      headers: { authorization: `Bearer ${token}` },
    });

    return Swal.fire({
      text: "¡Movimiento realizado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const postMovimientoPDF = (
  token,
  movimiento_id,
  empleado_id,
  identificacion
) => {
  const URL_POST_MOVIMIENTO_PDF = `${URL_SERVER}/movimientos/detalle`;

  return async () => {
    try {
      const response = await axios.post(
        URL_POST_MOVIMIENTO_PDF,
        {
          movimiento_id: movimiento_id,
          empleado_id: empleado_id,
          identificacion: identificacion,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      return response;
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

export const resetMovimientos = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const clearMovimientoDetail = () => {
  return async (dispatch) => {
    try {
      return await dispatch(resetMovimientoDetail());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
