import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllEstadosNacimiento = async (token, pais_id) => {
  const URL_ALL_ESTADOS_ACTIVOS = `${URL_SERVER}/estados/activos/${pais_id}`;

  try {
    const { data } = await axios(URL_ALL_ESTADOS_ACTIVOS, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const getAllEstadosResidencia = async (token, pais_id) => {
  const URL_ALL_ESTADOS_ACTIVOS = `${URL_SERVER}/estados/activos/${pais_id}`;

  try {
    const { data } = await axios(URL_ALL_ESTADOS_ACTIVOS, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
