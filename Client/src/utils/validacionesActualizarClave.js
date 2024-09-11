const regex = /^\d+$/;

export default function validations(inputs) {
  const { claveAnterior, claveNueva, confirmarClave } = inputs;

  const errors = {};

  if (claveAnterior) {
    if (!regex.test(claveAnterior)) {
      errors.claveAnterior = "Debe ingresar solo números";
    } else if (claveAnterior.length !== 4) {
      errors.claveAnterior = "Su clave debe ser de 4 dígitos";
    }
  }

  if (claveNueva) {
    if (!regex.test(claveNueva)) {
      errors.claveNueva = "Debe ingresar solo números";
    } else if (claveNueva.length !== 4) {
      errors.claveNueva = "Su clave debe ser de 4 dígitos";
    } else if (claveNueva === claveAnterior) {
      errors.claveNueva = "Su clave debe ser diferente a su clave actual";
    }
  }

  if (confirmarClave) {
    if (!regex.test(confirmarClave)) {
      errors.confirmarClave = "Debe ingresar solo números";
    } else if (confirmarClave.length !== 4) {
      errors.confirmarClave = "Su clave debe ser de 4 dígitos";
    } else if (claveNueva !== confirmarClave) {
      errors.confirmarClave =
        "La clave nueva y la confirmación de clave deben ser iguales";
    }
  }

  return errors;
}
