import axios from "axios";

import Swal from "sweetalert2";

import {
  allVacantes,
  vacanteDetail,
  paginaActual,
  limitePorPagina,
  filtros,
  resetFilters,
  resetState,
} from "./vacantesSlices";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const postPostulacionVacante = async (
  token,
  vacante_id,
  empleado_id
) => {
  const URL_POSTULACION_VACANTE = `${URL_SERVER}/vacantes/postulacion`;

  try {
    await axios.post(
      URL_POSTULACION_VACANTE,
      { vacante_id: vacante_id, empleado_id: empleado_id },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
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

export const resetVacantes = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
