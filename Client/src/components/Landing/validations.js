var regex = /^\d+$/;

export default function validations(inputs) {
  const errors = {};

  if (
    !inputs.cedula ||
    inputs.cedula == "0" ||
    inputs.cedula.charAt(0) === "0"
  ) {
    errors.cedula = "Debe ingresar un número de cédula para continuar";
  } else if (!regex.test(inputs.cedula)) {
    errors.cedula = "Debe ingresar solo números";
  } else if (inputs.cedula.length > 9) {
    errors.cedula = "Solo está permitido ingresar un máximo de 9 números";
  }

  return errors;
}
