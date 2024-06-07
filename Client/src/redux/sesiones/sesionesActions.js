import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const deleteSesion = async (token, empleado_id) => {
  const URL_DELETE_SESION = `${URL_SERVER}/sesiones/inactivar`;

  try {
    const { data } = await axios.put(
      URL_DELETE_SESION,
      { empleado_id: empleado_id },
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
