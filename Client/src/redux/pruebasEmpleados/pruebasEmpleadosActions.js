import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const postPruebaEmpleado = async (token, empleado_id, prueba) => {
  const URL_CREATE_PRUEBA = `${URL_SERVER}/pruebas_empleados`;

  try {
    const { data } = await axios.post(
      URL_CREATE_PRUEBA,
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

export const getAllPruebasEmpleados = async (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_RESPUESTAS_EMPLEADOS = `${URL_SERVER}/pruebas_empleados/allPruebasEmpleados`;

  try {
    const { data } = await axios.post(
      URL_ALL_RESPUESTAS_EMPLEADOS,
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
