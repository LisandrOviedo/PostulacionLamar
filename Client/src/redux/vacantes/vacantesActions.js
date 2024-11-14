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

  const {
    buscar_por,
    buscar,
    orden_campo,
    orden_por,
    area_interes_id,
    activo,
  } = filtros;

  if (buscar_por && buscar) {
    URL_ALL_VACANTES = `${URL_ALL_VACANTES}&buscar_por=${buscar_por}&buscar=${buscar}`;
  }

  if (orden_campo && orden_por) {
    URL_ALL_VACANTES = `${URL_ALL_VACANTES}&orden_campo=${orden_campo}&orden_por=${orden_por}`;
  }

  if (area_interes_id) {
    URL_ALL_VACANTES = `${URL_ALL_VACANTES}&area_interes_id=${area_interes_id}`;
  }

  if (activo) {
    URL_ALL_VACANTES = `${URL_ALL_VACANTES}&activo=${activo}`;
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

  const { buscar_por, buscar, orden_campo, orden_por, activo } = filtros;

  if (buscar_por && buscar) {
    URL_VACANTE_DETAIL = `${URL_VACANTE_DETAIL}&buscar_por=${buscar_por}&buscar=${buscar}`;
  }

  if (orden_campo && orden_por) {
    URL_VACANTE_DETAIL = `${URL_VACANTE_DETAIL}&orden_campo=${orden_campo}&orden_por=${orden_por}`;
  }

  if (activo) {
    URL_VACANTE_DETAIL = `${URL_VACANTE_DETAIL}&activo=${activo}`;
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

export const getVacanteDetailEmpleado = async (vacante_id) => {
  let URL_VACANTE_DETAIL_EMPLEADO = `${URL_SERVER}/vacantes/detalleEmpleado/${vacante_id}`;

  try {
    const { data } = await axios(URL_VACANTE_DETAIL_EMPLEADO);

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

  const {
    buscar_por,
    buscar,
    orden_campo,
    orden_por,
    area_interes_id,
    estado_solicitud,
  } = filtros;

  if (buscar_por && buscar) {
    URL_ALL_POSTULACIONES_EMPLEADO = `${URL_ALL_POSTULACIONES_EMPLEADO}&buscar_por=${buscar_por}&buscar=${buscar}`;
  }

  if (orden_campo && orden_por) {
    URL_ALL_POSTULACIONES_EMPLEADO = `${URL_ALL_POSTULACIONES_EMPLEADO}&orden_campo=${orden_campo}&orden_por=${orden_por}`;
  }

  if (area_interes_id) {
    URL_ALL_POSTULACIONES_EMPLEADO = `${URL_ALL_POSTULACIONES_EMPLEADO}&area_interes_id=${area_interes_id}`;
  }

  if (estado_solicitud) {
    URL_ALL_POSTULACIONES_EMPLEADO = `${URL_ALL_POSTULACIONES_EMPLEADO}&estado_solicitud=${estado_solicitud}`;
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

export const getPostulacionEmpleado = async (token, vacante_empleado_id) => {
  const URL_GET_POSTULACION_EMPLEADO = `${URL_SERVER}/vacantes/postulacionEmpleado/${vacante_empleado_id}`;

  try {
    const { data } = await axios(URL_GET_POSTULACION_EMPLEADO, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const putCambiarEstadoPostulacion = async (
  token,
  vacante_empleado_id,
  revisado_por_id
) => {
  const URL_PUT_ESTADO = `${URL_SERVER}/vacantes/modificarEstado`;

  try {
    await axios.put(
      `${URL_PUT_ESTADO}`,
      {
        vacante_empleado_id,
        revisado_por_id,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const postVacante = async (token, crearVacante) => {
  const URL_POST_VACANTE = `${URL_SERVER}/vacantes`;

  try {
    await axios.post(URL_POST_VACANTE, crearVacante, {
      headers: { authorization: `Bearer ${token}` },
    });

    Swal.fire({
      text: "¡Vacante creada exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const putActivo = async (token, vacante_id) => {
  const URL_PUT_ACTIVO = `${URL_SERVER}/vacantes/inactivar`;

  try {
    await axios.put(
      URL_PUT_ACTIVO,
      { vacante_id },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return Swal.fire({
      text: "¡Vacante actualizada exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
      width: "20em",
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
