const { Curriculo } = require("../db");

const todosLosCurriculos = async () => {
  try {
    const curriculos = await Curriculo.findAll();

    if (curriculos.length === 0) {
      return "No existen curriculos";
    }

    return curriculos;
  } catch (error) {
    return "Error al traer todos los curriculos: ", error.message;
  }
};

const traerCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    return "Datos faltantes";
  }

  try {
    const curriculo = await Curriculo.findByPk(curriculo_id);

    if (curriculo === null) {
      return "No existe ese curriculo";
    }

    return curriculo;
  } catch (error) {
    return "Error al traer el curriculo: ", error.message;
  }
};

const crearCurriculo = async (
  empleado_id,
  grado_instruccion,
  titulo_obtenido,
  centro_educativo,
  area_interes_id,
  area_interes_otro,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  ruta_pdf,
  estado
) => {
  if (
    !empleado_id ||
    !grado_instruccion ||
    !titulo_obtenido ||
    !centro_educativo ||
    !area_interes_id ||
    !area_interes_otro ||
    !disponibilidad_viajar ||
    !disponibilidad_cambio_residencia ||
    !ruta_pdf ||
    !estado
  ) {
    return "Datos faltantes";
  }

  try {
    const [curriculo, created] = await Curriculo.findOrCreate({
      where: { empleado_id: empleado_id },
      defaults: {
        empleado_id: empleado_id,
        grado_instruccion: grado_instruccion,
        titulo_obtenido: titulo_obtenido,
        centro_educativo: centro_educativo,
        area_interes_id: area_interes_id,
        area_interes_otro: area_interes_otro,
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        ruta_pdf: ruta_pdf,
        estado: estado,
      },
    });

    if (created) {
      return curriculo;
    }

    return "Ya existe un curriculo para ese empleado";
  } catch (error) {
    return "Error al crear el curriculo: ", error.message;
  }
};

const modificarCurriculo = async (
  curriculo_id,
  grado_instruccion,
  titulo_obtenido,
  centro_educativo,
  area_interes_id,
  area_interes_otro,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  ruta_pdf,
  estado,
  inactivo
) => {
  if (
    !curriculo_id ||
    !grado_instruccion ||
    !titulo_obtenido ||
    !centro_educativo ||
    !area_interes_id ||
    !area_interes_otro ||
    !disponibilidad_viajar ||
    !disponibilidad_cambio_residencia ||
    !ruta_pdf ||
    !estado ||
    !inactivo
  ) {
    return "Datos faltantes";
  }

  try {
    await traerCurriculo(curriculo_id);

    await Curriculo.update(
      {
        curriculo_id: curriculo_id,
        grado_instruccion: grado_instruccion,
        titulo_obtenido: titulo_obtenido,
        centro_educativo: centro_educativo,
        area_interes_id: area_interes_id,
        area_interes_otro: area_interes_otro,
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        ruta_pdf: ruta_pdf,
        estado: estado,
        inactivo: inactivo,
      },
      {
        where: {
          curriculo_id: curriculo_id,
        },
      }
    );

    return await traerCurriculo(curriculo_id);
  } catch (error) {
    return "Error al modificar el curriculo: ", error.message;
  }
};

const inactivarCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    return "Datos faltantes";
  }

  try {
    const curriculo = await traerCurriculo(curriculo_id);

    await Curriculo.update(
      { inactivo: !curriculo.inactivo },
      {
        where: { curriculo_id: curriculo_id },
      }
    );

    return await traerCurriculo(curriculo_id);
  } catch (error) {
    return "Error al inactivar el curriculo: ", error.message;
  }
};

module.exports = {
  todosLosCurriculos,
  traerCurriculo,
  crearCurriculo,
  modificarCurriculo,
  inactivarCurriculo,
};
