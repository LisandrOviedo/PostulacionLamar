import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

import { prueba, resetState } from "./pruebaSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getPrueba = (token) => {
  const URL_PRUEBA = `${URL_SERVER}/respuestas`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_PRUEBA, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(prueba(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const getPruebaEmpleado = async (token, empleado_id) => {
  const URL_GET_PRUEBA_EMPLEADO = `${URL_SERVER}/respuestas_empleados/empleado/${empleado_id}`;

  try {
    const { data } = await axios(URL_GET_PRUEBA_EMPLEADO, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const postPrueba = async (token, empleado_id, prueba) => {
  const URL_POST_PRUEBA = `${URL_SERVER}/respuestas_empleados`;

  try {
    await axios.post(
      URL_POST_PRUEBA,
      { empleado_id: empleado_id, prueba: prueba },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return Swal.fire({
      text: "Prueba enviada exitosamente",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

export const resetPrueba = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};
