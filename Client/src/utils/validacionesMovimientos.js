const regexSoloNumeros = /^\d+$/;
const regexLetras = /^[a-zA-Z\s]+$/;

export default function validations(inputs) {
  const errors = {};

  const {
    tipo_identificacion,
    numero_identificacion,
    numero_identificacion_solicitante,
    tipo_identificacion_solicitante,
    nuevo_sueldo,
    nuevo_codigo_nomina,
    duracion_movimiento_desde,
    duracion_movimiento_hasta,
    vigencia_movimiento_desde,
    vigencia_movimiento_hasta,
    numero_identificacion_supervisor,
    tipo_identificacion_supervisor,
    tipo_identificacion_gerencia,
    numero_identificacion_gerencia,
    tipo_identificacion_tthh,
    numero_identificacion_tthh,
    codigo_nomina,
  } = inputs; //debo importar

  //Numero de identificación

  if (tipo_identificacion && numero_identificacion) {
    if (
      tipo_identificacion === "V" &&
      !regexSoloNumeros.test(numero_identificacion)
    ) {
      // Si es una cedula y contiene letras, marca el error
      errors.numero_identificacion =
        "El número de identificación debe contener solo números";
    } else if (numero_identificacion.length > 20) {
      errors.numero_identificacion =
        "El número de identificación debe contener máximo 20 números";
    }
  }

  if (codigo_nomina) {
    if (codigo_nomina.length === 1) {
      errors.codigo_nomina = "El código debe ser de al menos 2 caracteres";
    }
  }

  //numero_identificacion_solicitante

  if (tipo_identificacion_solicitante && numero_identificacion_solicitante) {
    if (
      tipo_identificacion_solicitante === "V" &&
      !regexSoloNumeros.test(numero_identificacion_solicitante)
    ) {
      // Si es una cedula y contiene letras, marca el error
      errors.numero_identificacion_solicitante =
        "El número de identificación debe contener solo números";
    } else if (numero_identificacion_solicitante.length > 20) {
      errors.numero_identificacion_solicitante =
        "El número de identificación debe contener máximo 20 números";
    }
  }

  //Supervisor Inmediato
  if (tipo_identificacion_supervisor && numero_identificacion_supervisor) {
    if (
      tipo_identificacion_supervisor === "V" &&
      !regexSoloNumeros.test(numero_identificacion_supervisor)
    ) {
      // Si es una cedula y contiene letras, marca el error
      errors.numero_identificacion_supervisor =
        "El número de identificación debe contener solo números";
    } else if (numero_identificacion_supervisor.length > 20) {
      errors.numero__identificacion_supervisor =
        "El número de identificación debe contener máximo 20 números";
    }
  }
  //Aprobación Gerencia De Área

  if (tipo_identificacion_gerencia && numero_identificacion_gerencia) {
    if (
      tipo_identificacion_gerencia === "V" &&
      !regexSoloNumeros.test(numero_identificacion_gerencia)
    ) {
      // Si es una cedula y contiene letras, marca el error
      errors.numero_identificacion_gerencia =
        "El número de identificación debe contener solo números";
    } else if (numero_identificacion_gerencia.length > 20) {
      errors.numero_identificacion_gerencia =
        "El número de identificación debe contener máximo 20 números";
    }
  }
  //Talento Humano

  if (tipo_identificacion_tthh && numero_identificacion_tthh) {
    if (
      tipo_identificacion_tthh === "V" &&
      !regexSoloNumeros.test(numero_identificacion_tthh)
    ) {
      // Si es una cedula y contiene letras, marca el error
      errors.numero_identificacion_tthh =
        "El número de identificación debe contener solo números";
    } else if (numero_identificacion_tthh.length > 20) {
      errors.numero_identificacion_tthh =
        "El número de identificación debe contener máximo 20 números";
    }
  }

  if (nuevo_sueldo) {
    if (nuevo_sueldo.length > 8) {
      errors.nuevo_sueldo = "El nuevo sueldo no debe tener más de 8 dígitos";
    }
  }

  //Nuevo Codigo de Nomina
  if (nuevo_codigo_nomina) {
    if (nuevo_codigo_nomina.length < 2) {
      errors.nuevo_codigo_nomina =
        "El nuevo código de nómina debe contener mínimo 2 caracteres";
    }
  }

  // Validación de duración del movimiento
  if (
    duracion_movimiento_desde &&
    duracion_movimiento_hasta &&
    duracion_movimiento_desde >= duracion_movimiento_hasta
  ) {
    errors.duracion_movimiento =
      'La fecha "Desde" no puede ser mayor o igual que la fecha "Hasta"';
  }

  if (
    vigencia_movimiento_desde &&
    vigencia_movimiento_hasta &&
    vigencia_movimiento_desde >= vigencia_movimiento_hasta
  ) {
    errors.vigencia_movimiento =
      'La fecha "Desde" no puede ser mayor o igual que la fecha "Hasta"';
  }

  return errors;
}
