import axios from "axios";

import Swal from "sweetalert2";


import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllClasesMovimientosActivas = async (token) => {
  const URL_ALL_CLASES_MOVIMIENTOS_ACTIVAS = `${URL_SERVER}/clases_movimientos/activas`;

  try {
    const { data } = await axios(URL_ALL_CLASES_MOVIMIENTOS_ACTIVAS, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
