const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^\+[1-9]\d*$/;

export default function validations(inputs) {
  const { telefono } = inputs;

  const errors = {};

  if (telefono) {
    if (!regexTelefono.test(telefono)) {
      errors.telefono = "Teléfono inválido (Ejemplo: +58412XXXXXXX)";
    } else if (telefono.length < 11) {
      errors.telefono = "El teléfono debe contener al menos 11 caracteres";
    } else if (telefono.length > 20) {
      errors.telefono = "El teléfono debe contener máximo 20 caracteres";
    }
  }

  if (correo) {
    if (!regexEmail.test(correo)) {
      errors.correo =
        "Correo electrónico inválido (Ejemplo: ejemplo@ejemplo.com)";
    } else if (correo.length > 150) {
      errors.correo =
        "El correo electrónico debe contener máximo 150 caracteres";
    }
  }

  if (direccion) {
    if (direccion.length > 150) {
      errors.direccion = "La dirección debe contener máximo 150 caracteres";
    }
  }

  return errors;
}
