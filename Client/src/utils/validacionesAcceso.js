const regex = /^\d+$/;

export default function validations(inputs) {
  const errors = {};

  if (inputs.cedula && !regex.test(inputs.cedula)) {
    errors.cedula = "Debe ingresar solo números";
  } else if (inputs.cedula.length > 10) {
    errors.cedula = "Solo está permitido ingresar un máximo de 10 números";
  }

  return errors;
}
