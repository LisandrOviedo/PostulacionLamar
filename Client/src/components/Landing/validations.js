var regex = /^\d+$/;

export default function validations(inputs) {
  const errors = {};

  if (
    !inputs.cedula ||
    inputs.cedula == "0" ||
    inputs.cedula.charAt(0) === "0"
  ) {
    errors.cedula = "Debe ingresar su número de cédula";
  } else if (!regex.test(inputs.cedula)) {
    errors.cedula = "Debe ingresar solo números";
  } else if (inputs.cedula.length > 10) {
    errors.cedula = "Solo está permitido ingresar un máximo de 10 números";
  }

  if (!inputs.clave) {
    errors.clave = "Debe ingresar su contraseña";
  }

  return errors;
}
