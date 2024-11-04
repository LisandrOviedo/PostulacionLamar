import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllMunicipiosActivos = async (token, estado_id) => {
  const URL_ALL_MUNICIPIOS_ACTIVOS = `${URL_SERVER}/municipios/activos/${estado_id}`;

  try {
    const { data } = await axios(URL_ALL_MUNICIPIOS_ACTIVOS, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};