const regex = /^\d+$/;

export default function validations(inputs) {
  const { clave, confirmarClave } = inputs;

  const errors = {};

  if (clave) {
    if (!regex.test(clave)) {
      errors.clave = "Debe ingresar solo números";
    } else if (clave.length !== 4) {
      errors.clave = "Su clave debe ser de 4 dígitos";
    }
  }

  if (confirmarClave) {
    if (!regex.test(confirmarClave)) {
      errors.confirmarClave = "Debe ingresar solo números";
    } else if (confirmarClave.length !== 4) {
      errors.confirmarClave = "Su clave debe ser de 4 dígitos";
    } else if (clave !== confirmarClave) {
      errors.confirmarClave =
        "La clave y la confirmación de clave deben ser iguales";
    }
  }

  return errors;
}
