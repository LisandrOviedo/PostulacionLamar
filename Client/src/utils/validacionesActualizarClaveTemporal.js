const regex = /^\d+$/;

export default function validations(inputs) {
  const errors = {};

  if (inputs.clave) {
    if (!regex.test(inputs.clave)) {
      errors.clave = "Debe ingresar solo números";
    } else if (inputs.clave.length !== 4) {
      errors.clave = "Su clave debe ser de 4 dígitos";
    }
  }

  if (inputs.confirmarClave) {
    if (!regex.test(inputs.confirmarClave)) {
      errors.confirmarClave = "Debe ingresar solo números";
    } else if (inputs.confirmarClave.length !== 4) {
      errors.confirmarClave = "Su clave debe ser de 4 dígitos";
    } else if (inputs.clave !== inputs.confirmarClave) {
      errors.confirmarClave =
        "La clave y la confirmación de clave deben ser iguales";
    }
  }

  return errors;
}
