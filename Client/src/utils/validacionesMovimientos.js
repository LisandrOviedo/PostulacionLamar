const regexSoloNumeros = /^\d+$/;
const regexLetras = /^[a-zA-Z\s]+$/;

export default function validations(inputs) {
  const errors = {};

  const {
    tipo_identificacion,
    numero_identificacion,
    nuevo_sueldo,
    nuevo_codigo_nomina,
    duracion_movimiento_desde,
    duracion_movimiento_hasta,
    vigencia_movimiento_desde,
    vigencia_movimiento_hasta
 
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
  //Finaliza Nuevo Codigo de Nomina

  // Validación de duración del movimiento
  if (
    duracion_movimiento_desde &&
    duracion_movimiento_hasta &&
    duracion_movimiento_desde >= duracion_movimiento_hasta
  ) {
    errors.duracion_movimiento =
      "La fecha 'Desde' no puede ser mayor o igual que la fecha 'Hasta'.";
  }
  
  if (
    vigencia_movimiento_desde &&
    vigencia_movimiento_hasta &&
    vigencia_movimiento_desde >= vigencia_movimiento_hasta
  ) {
    errors.vigencia_movimiento =
      "La fecha 'Desde' no puede ser mayor o igual que la fecha 'Hasta'.";
  }
  
  return errors;
}
