const regexSoloNumeros = /^\d+$/;
const regexLetras = /^[a-zA-Z\s]+$/;

export default function validations(inputs) {
  const errors = {};

  const {
    tipo_identificacion,
    numero_identificacion,
    nuevo_sueldo,
    nuevo_codigo_nomina,
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

  // if (tipo_identificacion && tipo_identificacion.length > 5) {
  //   errors.tipo_identificacion = "el mensaje de error";
  // }

  return errors;
}
