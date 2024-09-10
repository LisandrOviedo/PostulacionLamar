const regex = /^\d+$/;

export default function validations(inputs) {
  const { numero_identificacion } = inputs;

  const errors = {};

  if (numero_identificacion) {
    if (!regex.test(numero_identificacion)) {
      errors.numero_identificacion = "Debe ingresar solo números";
    } else if (numero_identificacion.length > 10) {
      errors.numero_identificacion =
        "Solo está permitido ingresar un máximo de 10 números";
    }
  }

  return errors;
}
