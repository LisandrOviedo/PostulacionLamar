import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllVacantes = async (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  let URL_ALL_VACANTES = `${URL_SERVER}/vacantes?paginaActual=${paginaActual}&limitePorPagina=${limitePorPagina}`;

  if (filtros.buscar_por && filtros.buscar) {
    URL_ALL_VACANTES = `${URL_ALL_VACANTES}&buscar_por=${filtros.buscar_por}&buscar=${filtros.buscar}`;
  }

  if (filtros.orden_campo && filtros.orden_por) {
    URL_ALL_VACANTES = `${URL_ALL_VACANTES}&orden_campo=${filtros.orden_campo}&orden_por=${filtros.orden_por}`;
  }

  if (filtros.area_interes_id) {
    URL_ALL_VACANTES = `${URL_ALL_VACANTES}&area_interes_id=${filtros.area_interes_id}`;
  }

  if (filtros.activo) {
    URL_ALL_VACANTES = `${URL_ALL_VACANTES}&activo=${filtros.activo}`;
  }

  try {
    const { data } = await axios(URL_ALL_VACANTES, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getVacanteDetail = async (
  token,
  vacante_id,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  let URL_VACANTE_DETAIL = `${URL_SERVER}/vacantes/detalle/${vacante_id}?paginaActual=${paginaActual}&limitePorPagina=${limitePorPagina}`;

  if (filtros.buscar_por && filtros.buscar) {
    URL_VACANTE_DETAIL = `${URL_VACANTE_DETAIL}&buscar_por=${filtros.buscar_por}&buscar=${filtros.buscar}`;
  }

  if (filtros.orden_campo && filtros.orden_por) {
    URL_VACANTE_DETAIL = `${URL_VACANTE_DETAIL}&orden_campo=${filtros.orden_campo}&orden_por=${filtros.orden_por}`;
  }

  if (filtros.activo) {
    URL_VACANTE_DETAIL = `${URL_VACANTE_DETAIL}&activo=${filtros.activo}`;
  }

  try {
    const { data } = await axios(URL_VACANTE_DETAIL, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const postPostulacionVacante = async (
  token,
  vacante_id,
  empleado_id
) => {
  const URL_POSTULACION_VACANTE = `${URL_SERVER}/vacantes/postulacion`;

  try {
    const { data } = await axios.post(
      URL_POSTULACION_VACANTE,
      { vacante_id: vacante_id, empleado_id: empleado_id },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    if (data.vacante_id) {
      Swal.fire({
        text: "¡Te has postulado exitosamente!",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Oops...",
        text: `Ya te has postulado a esa vacante`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getPostulacionesEmpleado = async (
  token,
  empleado_id,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  let URL_ALL_POSTULACIONES_EMPLEADO = `${URL_SERVER}/vacantes/postulacionesEmpleado/${empleado_id}?paginaActual=${paginaActual}&limitePorPagina=${limitePorPagina}`;

  if (filtros.buscar_por && filtros.buscar) {
    URL_ALL_POSTULACIONES_EMPLEADO = `${URL_ALL_POSTULACIONES_EMPLEADO}&buscar_por=${filtros.buscar_por}&buscar=${filtros.buscar}`;
  }

  if (filtros.orden_campo && filtros.orden_por) {
    URL_ALL_POSTULACIONES_EMPLEADO = `${URL_ALL_POSTULACIONES_EMPLEADO}&orden_campo=${filtros.orden_campo}&orden_por=${filtros.orden_por}`;
  }

  if (filtros.area_interes_id) {
    URL_ALL_POSTULACIONES_EMPLEADO = `${URL_ALL_POSTULACIONES_EMPLEADO}&area_interes_id=${filtros.area_interes_id}`;
  }

  try {
    const { data } = await axios(URL_ALL_POSTULACIONES_EMPLEADO, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
