import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllSugerencias = async (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_SUGERENCIAS = `${URL_SERVER}/sugerencias/allSugerencias`;

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

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getSugerenciasActivasNoRevisadas = async () => {
  const URL_SUGERENCIAS_ACTIVAS_NO_REVISADAS = `${URL_SERVER}/sugerencias/activasNoRevisadas`;

  try {
    const { data } = await axios(URL_SUGERENCIAS_ACTIVAS_NO_REVISADAS);

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getSugerencia = async (token, sugerencia_id, empleado_id) => {
  const URL_SUGERENCIA_DETALLE = `${URL_SERVER}/sugerencias/detalle`;

  try {
    const { data } = await axios.post(
      URL_SUGERENCIA_DETALLE,
      { sugerencia_id, empleado_id },
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

export const postSugerencia = async (sugerencia) => {
  const URL_POST_SUGERENCIA = `${URL_SERVER}/sugerencias`;

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
