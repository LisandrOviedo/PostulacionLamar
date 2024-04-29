const regex = /^\d+$/;

export default function validations(inputs) {
  const errors = {};

  if (inputs.claveAnterior) {
    if (!regex.test(inputs.claveAnterior)) {
      errors.claveAnterior = "Debe ingresar solo números";
    } else if (inputs.claveAnterior.length !== 4) {
      errors.claveAnterior = "Su clave debe ser de 4 dígitos";
    }
  }

  if (inputs.claveNueva) {
    if (!regex.test(inputs.claveNueva)) {
      errors.claveNueva = "Debe ingresar solo números";
    } else if (inputs.claveNueva.length !== 4) {
      errors.claveNueva = "Su clave debe ser de 4 dígitos";
    } else if (inputs.claveNueva === inputs.claveAnterior) {
      errors.claveNueva = "Su clave debe ser diferente a su clave actual";
    }
  }

  if (inputs.confirmarClave) {
    if (!regex.test(inputs.confirmarClave)) {
      errors.confirmarClave = "Debe ingresar solo números";
    } else if (inputs.confirmarClave.length !== 4) {
      errors.confirmarClave = "Su clave debe ser de 4 dígitos";
    } else if (inputs.claveNueva !== inputs.confirmarClave) {
      errors.confirmarClave =
        "La clave nueva y la confirmación de clave deben ser iguales";
    }
  }

  return errors;
}
