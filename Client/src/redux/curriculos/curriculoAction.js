import axios from "axios";
import Swal from "sweetalert2";

import {
  allCurriculos,
  createCurriculo,
  curriculoEmpleado,
  resetState,
} from "./curriculoSlice";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getAllCurriculos = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_SERVER}/curriculos`);

      return dispatch(allCurriculos(data));
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

export const getCurriculoEmpleado = (empleado_id) => {
  const URL_CURRICULO_DETAIL = `${URL_SERVER}/curriculos/detalleEmpleado/${empleado_id}`;

  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_CURRICULO_DETAIL}`);

      return dispatch(curriculoEmpleado(data));
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

// POST CURRICULO

export const postCurriculo = (
  formData,
  areas_interes,
  titulos_obtenidos,
  experiencias
) => {
  const URL_CREATE_CURRICULO = `${URL_SERVER}/curriculos`;

  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL_CREATE_CURRICULO}`, formData);
      dispatch(createCurriculo(data));

      await postAreasInteres(data.curriculo_id, areas_interes);

      if (titulos_obtenidos) {
        await postTitulosObtenidos(data.curriculo_id, titulos_obtenidos);
      }

      if (experiencias) {
        await postExperiencias(data.curriculo_id, experiencias);
      }

      return Swal.fire({
        title: "¡Currículo enviado exitosamente!",
        text: "Si deseas actualizar o ver los detalles de tu currículo, debes iniciar sesión nuevamente",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

const postAreasInteres = async (curriculo_id, areas_interes) => {
  const URL_ADD_AREASINTERES = `${URL_SERVER}/areasinteres/agregarArea`;

  try {
    const { data } = await axios.post(`${URL_ADD_AREASINTERES}`, {
      curriculo_id,
      areas_interes,
    });

    return data;
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

const postTitulosObtenidos = async (curriculo_id, titulos_obtenidos) => {
  const URL_ADD_TITULOSOBTENIDOS = `${URL_SERVER}/titulosobtenidos`;

  try {
    const { data } = await axios.post(`${URL_ADD_TITULOSOBTENIDOS}`, {
      curriculo_id,
      titulos_obtenidos,
    });

    return data;
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

const postExperiencias = async (curriculo_id, experiencias) => {
  const URL_ADD_EXPERIENCIAS = `${URL_SERVER}/experiencias`;

  try {
    const { data } = await axios.post(`${URL_ADD_EXPERIENCIAS}`, {
      curriculo_id,
      experiencias,
    });

    return data;
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

// FIN CREAR CURRICULO

export const resetCurriculos = () => {
  return async (dispatch) => {
    try {
      return dispatch(resetState());
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

// UPDATE CURRICULO

export const putCurriculo = (
  formData,
  areas_interes,
  titulos_obtenidos,
  experiencias
) => {
  const URL_PUT_CURRICULO = `${URL_SERVER}/curriculos/modificar`;

  return async () => {
    try {
      const { data } = await axios.put(`${URL_PUT_CURRICULO}`, formData);

      await putAreasInteres(data.curriculo_id, areas_interes);

      if (titulos_obtenidos) {
        await putTitulosObtenidos(data.curriculo_id, titulos_obtenidos);
      }

      if (experiencias) {
        await putExperiencias(data.curriculo_id, experiencias);
      }

      return Swal.fire({
        title: "¡Curriculo actualizado exitosamente!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: `${error.response.data.error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error();
    }
  };
};

const putAreasInteres = async (curriculo_id, areas_interes) => {
  const URL_ADD_AREASINTERES = `${URL_SERVER}/areasinteres/agregarArea`;

  try {
    const { data } = await axios.post(`${URL_ADD_AREASINTERES}`, {
      curriculo_id,
      areas_interes,
    });

    return data;
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

const putTitulosObtenidos = async (curriculo_id, titulos_obtenidos) => {
  const URL_ADD_TITULOSOBTENIDOS = `${URL_SERVER}/titulosobtenidos`;

  try {
    const { data } = await axios.post(`${URL_ADD_TITULOSOBTENIDOS}`, {
      curriculo_id,
      titulos_obtenidos,
    });

    return data;
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

const putExperiencias = async (curriculo_id, experiencias) => {
  const URL_ADD_EXPERIENCIAS = `${URL_SERVER}/experiencias`;

  try {
    const { data } = await axios.post(`${URL_ADD_EXPERIENCIAS}`, {
      curriculo_id,
      experiencias,
    });

    return data;
  } catch (error) {
    Swal.fire({
      title: "Oops...",
      text: `${error.response.data.error}`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw new Error();
  }
};

// FIN PUT CURRICULO
