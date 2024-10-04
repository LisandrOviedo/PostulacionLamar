const regexSoloNumeros = /^\d+$/;

export default function validations(inputs) {
  const errors = {};

  const {
    tipo_identificacion,
    numero_identificacion,
    sueldo,
    codigo_nomina,
    tipo_identificacion_supervisor,
    tipo_identificacion_gerencia,
    tipo_identificacion_tthh,
    numero_identificacion_supervisor,
    numero_identificacion_gerencia,
    numero_identificacion_tthh,
    vigencia_movimiento_desde,
    vigencia_movimiento_hasta,
  } = inputs;

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

  if (sueldo) {
    if (sueldo.length > 8) {
      errors.sueldo = "El nuevo sueldo no debe tener más de 8 dígitos";
    }
  }

  if (vigencia_movimiento_desde && vigencia_movimiento_hasta) {
    if (vigencia_movimiento_hasta <= vigencia_movimiento_desde) {
      errors.vigencia_movimiento =
        "La fecha de vigencia (hasta) no puede ser menor o igual a la (desde)";
    }
  }

  return errors;
}
