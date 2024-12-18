const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^\+[1-9]\d*$/;

export default function validations(inputs) {
  const { telefono, correo, direccion } = inputs;

  const errors = {};

  // Validación del teléfono

  if (telefono) {
    if (!regexTelefono.test(telefono)) {
      errors.telefono = "Debes ingresar un telefono válido (+58...)";
    } else if (telefono.length < 11) {
      errors.telefono = "Debe contener al menos 11 caracteres";
    } else if (telefono.length > 20) {
      errors.telefono = "Debe contener máximo 20 caracteres";
    }
  }

  // Validación del correo
  if (correo) {
    if (!regexEmail.test(correo)) {
      errors.correo = "Debes ingresar un correo válido";
    } else if (correo.length > 150) {
      errors.correo = "El máximo de caracteres en el correo son 150";
    }
  }

  // Validación de la dirección
  if (direccion) {
    if (direccion.length > 150) {
      errors.direccion = "La dirección debe contener máximo 150 caracteres";
    }
  }

  return errors;
}
