const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^\+\d+$/;

export default function validations(inputs) {
  const errors = {};

  if (inputs.telefono && !regexTelefono.test(inputs.telefono)) {
    errors.telefono = "Teléfono inválido (Ejemplo: +58412XXXXXXX)";
  } else if (inputs.telefono && inputs.telefono.length > 20) {
    errors.telefono = "El teléfono debe contener máximo 20 caracteres";
  }

  if (inputs.correo && !regexEmail.test(inputs.correo)) {
    errors.correo =
      "Correo electrónico inválido (Ejemplo: ejemplo@ejemplo.com)";
  } else if (inputs.correo && inputs.correo.length > 150) {
    errors.correo = "El correo electrónico debe contener máximo 150 caracteres";
  }

  if (inputs.direccion && inputs.direccion.length > 150) {
    errors.direccion = "La dirección debe contener máximo 150 caracteres";
  }

  return errors;
}
