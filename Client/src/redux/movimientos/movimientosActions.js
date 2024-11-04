import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllMovimientos = async (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_EMPLEADOS = `${URL_SERVER}/movimientos/allMovimientos`;

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

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getMovimientoDetail = async (
  token,
  movimiento_id,
  empleado_id
) => {
  const URL_MOVIMIENTO_DETAIL = `${URL_SERVER}/movimientos/detalle?movimiento_id=${movimiento_id}&empleado_id=${empleado_id}`;

  try {
    const { data } = await axios(URL_MOVIMIENTO_DETAIL, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
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
      timer: 3000,
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
      timer: 3000,
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
      timer: 3000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const postMovimientoPDF = async (
  token,
  movimiento_id,
  empleado_id,
  identificacion
) => {
  const URL_POST_MOVIMIENTO_PDF = `${URL_SERVER}/movimientos/detalle`;

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
