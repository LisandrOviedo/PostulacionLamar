const regex = /^\d+$/;

export default function validations(inputs) {
  const errors = {};

  if (
    inputs.numero_identificacion &&
    !regex.test(inputs.numero_identificacion)
  ) {
    errors.numero_identificacion = "Debe ingresar solo números";
  } else if (inputs.numero_identificacion && inputs.numero_identificacion.length > 10) {
    errors.numero_identificacion =
      "Solo está permitido ingresar un máximo de 10 números";
  }

  return errors;
}
