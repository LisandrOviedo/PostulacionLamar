const regexSoloNumeros = /^\d+$/;

export default function validations(inputs) {
  const { tipo_identificacion, numero_identificacion } = inputs;

  const errors = {};

  if (tipo_identificacion && numero_identificacion) {
    if (
      tipo_identificacion === "V" &&
      !regexSoloNumeros.test(numero_identificacion)
    ) {
      // Si es una cedula y contiene letras, marca el error
      errors.numero_identificacion =
        "El número de identificación debe contener solo números";
    }
  }

  return errors;
}
