import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllTiposSugerenciasActivas = async () => {
  const URL_ALL_TIPOS_SUGERENCIAS_ACTIVAS = `${URL_SERVER}/tipos_sugerencias/activas`;

  try {
    const { data } = await axios(URL_ALL_TIPOS_SUGERENCIAS_ACTIVAS);

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
