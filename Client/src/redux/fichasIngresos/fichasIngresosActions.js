import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

// POST FICHA INGRESO

export const saveFichaIngreso = async (token, datosIngreso) => {
  const URL_POST_EMPLEADO = `${URL_SERVER}/empleados`;

  try {
    const { data } = await axios.post(`${URL_POST_EMPLEADO}`, datosIngreso, {
      headers: { authorization: `Bearer ${token}` },
    });

    await postDireccion(token, data.empleado_id, datosIngreso);

    if (datosIngreso.titulos_obtenidos.length) {
      await postTitulosObtenidos(
        token,
        data.empleado_id,
        datosIngreso.titulos_obtenidos
      );
    }

    if (datosIngreso.experiencias.length) {
      await postExperiencias(
        token,
        data.empleado_id,
        datosIngreso.experiencias
      );
    }

    if (datosIngreso.referencias_personales.length) {
      await postReferenciasPersonales(
        token,
        data.empleado_id,
        datosIngreso.referencias_personales
      );
    }

    await postSalud(token, data.empleado_id, datosIngreso);

    await postContactosEmergencia(
      token,
      data.empleado_id,
      datosIngreso.contactos_emergencia
    );

    await postDatosBancarios(token, data.empleado_id, datosIngreso);

    await postCargoEmpleado(token, data.empleado_id, datosIngreso);

    await postFichaIngreso(token, data.empleado_id, datosIngreso);

    return Swal.fire({
      text: "¡Ingreso exitoso!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const postDireccion = async (token, empleado_id, datosIngreso) => {
  const URL_ADD_DIRECCION = `${URL_SERVER}/direcciones`;

  try {
    await axios.post(
      `${URL_ADD_DIRECCION}`,
      {
        empleado_id,
        datosIngreso,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const postTitulosObtenidos = async (token, empleado_id, titulos_obtenidos) => {
  const URL_ADD_TITULOSOBTENIDOS = `${URL_SERVER}/titulos_obtenidos`;

  try {
    await axios.post(
      `${URL_ADD_TITULOSOBTENIDOS}`,
      {
        empleado_id,
        titulos_obtenidos,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const postExperiencias = async (token, empleado_id, experiencias) => {
  const URL_ADD_EXPERIENCIAS = `${URL_SERVER}/experiencias`;

  try {
    await axios.post(
      `${URL_ADD_EXPERIENCIAS}`,
      {
        empleado_id,
        experiencias,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const postReferenciasPersonales = async (
  token,
  empleado_id,
  referencias_personales
) => {
  const URL_ADD_REFERENCIAS_PERSONALES = `${URL_SERVER}/referencias_personales`;

  try {
    await axios.post(
      `${URL_ADD_REFERENCIAS_PERSONALES}`,
      {
        empleado_id,
        referencias_personales,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const postSalud = async (token, empleado_id, datosIngreso) => {
  const URL_ADD_SALUD = `${URL_SERVER}/salud`;

  try {
    await axios.post(
      `${URL_ADD_SALUD}`,
      {
        empleado_id,
        datosIngreso,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const postContactosEmergencia = async (
  token,
  empleado_id,
  contactos_emergencia
) => {
  const URL_ADD_CONTACTOS_EMERGENCIA = `${URL_SERVER}/contactos_emergencia`;

  try {
    await axios.post(
      `${URL_ADD_CONTACTOS_EMERGENCIA}`,
      {
        empleado_id,
        contactos_emergencia,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const postDatosBancarios = async (token, empleado_id, datosIngreso) => {
  const URL_ADD_DATOS_BANCARIOS = `${URL_SERVER}/datos_bancarios`;

  try {
    await axios.post(
      `${URL_ADD_DATOS_BANCARIOS}`,
      {
        empleado_id,
        datosIngreso,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const postCargoEmpleado = async (token, empleado_id, datosIngreso) => {
  const URL_ADD_CARGO_EMPLEADO = `${URL_SERVER}/cargos_empleados`;

  try {
    await axios.post(
      `${URL_ADD_CARGO_EMPLEADO}`,
      {
        empleado_id,
        datosIngreso,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const postFichaIngreso = async (token, empleado_id, datosIngreso) => {
  const URL_ADD_FICHA_INGRESO = `${URL_SERVER}/fichas_ingresos`;

  try {
    await axios.post(
      `${URL_ADD_FICHA_INGRESO}`,
      {
        empleado_id,
        datosIngreso,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

// FIN POST FICHA INGRESO

export const postFichaIngresoPDF = async (
  token,
  empleado_id,
  identificacion
) => {
  const URL_POST_FICHA_INGRESO_PDF = `${URL_SERVER}/fichas_ingresos/detalle`;

  try {
    const response = await axios.post(
      URL_POST_FICHA_INGRESO_PDF,
      {
        empleado_id: empleado_id,
        identificacion: identificacion,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return response;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};
