import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

import { prueba_kostick } from "../pruebasEmpleados/pruebasEmpleadosSlices";

import { postPruebaEmpleado } from "../pruebasEmpleados/pruebasEmpleadosActions";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getPruebaKostick = (token) => {
  const URL_PRUEBA = `${URL_SERVER}/preguntas_kostick`;

  return async (dispatch) => {
    try {
      const { data } = await axios(URL_PRUEBA, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch(prueba_kostick(data));
    } catch (error) {
      alertError(error);

      throw new Error();
    }
  };
};

export const getPruebaKostickEmpleado = async (token, empleado_id, prueba) => {
  const URL_GET_PRUEBA_EMPLEADO = `${URL_SERVER}/pruebas_empleados/pruebasEmpleados`;

  try {
    const { data } = await axios.post(
      URL_GET_PRUEBA_EMPLEADO,
      { empleado_id: empleado_id, prueba: prueba },
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

export const postPruebaKostick = async (token, empleado_id, prueba) => {
  const URL_POST_PRUEBA = `${URL_SERVER}/respuestas_kostick`;

  try {
    const crearPruebaEmpleado = await postPruebaEmpleado(
      token,
      empleado_id,
      "Kostick"
    );

    await axios.post(
      URL_POST_PRUEBA,
      {
        empleado_id: empleado_id,
        prueba_id: crearPruebaEmpleado.prueba_id,
        prueba: prueba,
      },
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
