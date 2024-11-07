import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getLiquidaciones = async (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  let URL_ALL_LIQUIDACIONES = `${URL_SERVER}/liquidaciones?paginaActual=${paginaActual}&limitePorPagina=${limitePorPagina}`;

  if (filtros.buscar_por && filtros.buscar) {
    URL_ALL_LIQUIDACIONES = `${URL_ALL_LIQUIDACIONES}&buscar_por=${filtros.buscar_por}&buscar=${filtros.buscar}`;
  }

  if (filtros.orden_campo && filtros.orden_por) {
    URL_ALL_LIQUIDACIONES = `${URL_ALL_LIQUIDACIONES}&orden_campo=${filtros.orden_campo}&orden_por=${filtros.orden_por}`;
  }

  if (filtros.activo) {
    URL_ALL_LIQUIDACIONES = `${URL_ALL_LIQUIDACIONES}&activo=${filtros.activo}`;
  }

  try {
    const { data } = await axios(URL_ALL_LIQUIDACIONES, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getLiquidacion = async (
  token,
  liquidacion_id,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  let URL_LIQUIDACION = `${URL_SERVER}/liquidaciones/detalle/${liquidacion_id}?paginaActual=${paginaActual}&limitePorPagina=${limitePorPagina}`;

  if (filtros.buscar_por && filtros.buscar) {
    URL_LIQUIDACION = `${URL_LIQUIDACION}&buscar_por=${filtros.buscar_por}&buscar=${filtros.buscar}`;
  }

  if (filtros.orden_campo && filtros.orden_por) {
    URL_LIQUIDACION = `${URL_LIQUIDACION}&orden_campo=${filtros.orden_campo}&orden_por=${filtros.orden_por}`;
  }

  if (filtros.activo) {
    URL_LIQUIDACION = `${URL_LIQUIDACION}&activo=${filtros.activo}`;
  }

  try {
    const { data } = await axios(URL_LIQUIDACION, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const postLiquidacion = async (token, datosLiquidaciones) => {
  const URL_POST_LIQUIDACION = `${URL_SERVER}/liquidaciones`;

  try {
    await axios.post(
      URL_POST_LIQUIDACION,
      { datosLiquidaciones },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return Swal.fire({
      text: "¡Liquidación realizada exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
