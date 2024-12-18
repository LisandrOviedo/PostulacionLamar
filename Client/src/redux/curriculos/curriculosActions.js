import axios from "axios";

import Swal from "sweetalert2";

import { alertError } from "../../utils/sweetAlert2";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllCurriculos = async (
  token,
  filtros,
  paginaActual,
  limitePorPagina
) => {
  const URL_ALL_CURRICULOS = `${URL_SERVER}/curriculos/allCurriculos`;

  try {
    const { data } = await axios.post(
      URL_ALL_CURRICULOS,
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

export const postCurriculoPDF = async (token, empleado_id, identificacion) => {
  const URL_CURRICULO = `${URL_SERVER}/curriculos/detalle`;

  try {
    const response = await axios.post(
      URL_CURRICULO,
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

export const getCurriculoPDFAnexos = async (
  token,
  empleado_id,
  identificacion
) => {
  const URL_CURRICULO = `${URL_SERVER}/curriculos/detalleAnexos`;

  try {
    await axios.post(
      URL_CURRICULO,
      {
        empleado_id: empleado_id,
        identificacion: identificacion,
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

export const getCurriculoEmpleado = async (token, empleado_id) => {
  const URL_CURRICULO_DETAIL = `${URL_SERVER}/curriculos/detalleEmpleado/${empleado_id}`;

  try {
    const { data } = await axios(URL_CURRICULO_DETAIL, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

// UPDATE CURRICULO

export const putCurriculo = async (token, datosCurriculo) => {
  const URL_PUT_CURRICULO = `${URL_SERVER}/curriculos/modificar`;

  try {
    const { data } = await axios.put(`${URL_PUT_CURRICULO}`, datosCurriculo, {
      headers: { authorization: `Bearer ${token}` },
    });

    await putAreasInteres(
      token,
      data.curriculo_id,
      datosCurriculo.areas_interes
    );

    if (datosCurriculo.titulos_obtenidos.length) {
      await putTitulosObtenidos(
        token,
        datosCurriculo.empleado_id,
        datosCurriculo.titulos_obtenidos
      );
    }

    if (datosCurriculo.experiencias.length) {
      await putExperiencias(
        token,
        datosCurriculo.empleado_id,
        datosCurriculo.experiencias
      );
    }

    if (datosCurriculo.idiomas.length) {
      await putIdiomas(token, data.curriculo_id, datosCurriculo.idiomas);
    }

    return Swal.fire({
      text: "¡Perfil profesional actualizado exitosamente!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    alertError(error);

    throw new Error();
  }
};

const putAreasInteres = async (token, curriculo_id, areas_interes) => {
  const URL_ADD_AREASINTERES = `${URL_SERVER}/areas_interes/agregarArea`;

  try {
    await axios.post(
      `${URL_ADD_AREASINTERES}`,
      {
        curriculo_id,
        areas_interes,
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

const putTitulosObtenidos = async (token, empleado_id, titulos_obtenidos) => {
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

const putExperiencias = async (token, empleado_id, experiencias) => {
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

const putIdiomas = async (token, curriculo_id, idiomas) => {
  const URL_ADD_IDIOMAS = `${URL_SERVER}/idiomas/agregarIdioma`;

  try {
    await axios.post(
      `${URL_ADD_IDIOMAS}`,
      {
        curriculo_id,
        idiomas,
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

// FIN PUT CURRICULO

export const putCambiarEstado = async (token, empleado_id, revisado_por_id) => {
  const URL_PUT_ESTADO = `${URL_SERVER}/curriculos/modificarEstado`;

  try {
    await axios.put(
      `${URL_PUT_ESTADO}`,
      {
        empleado_id,
        revisado_por_id,
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
