
const soloNumeros = /^[0-9]+$/;

export default function validations(inputs) {
  const { telefono, correo, direccion } = inputs;
 
  const errors = {};

  // Validación del teléfono
  if (telefono.trim() === "") {
    // No hay error si el campo está vacío
  } else if (!soloNumeros.test(telefono)) {
    errors.telefono = "Solo debe contener números";
  } else if (telefono.length < 11) {
    errors.telefono = "Debe contener al menos 11 caracteres.";
  } else if (telefono.length > 20) {
    errors.telefono = "Debe contener máximo 20 caracteres.";
  }

  // Validación del correo
  if (correo) {
    if (!correo.includes('@')) {
      errors.correo = "Correo electrónico inválido: debe contener un '@'.";
    } else if (correo.length > 150) {
      errors.correo = "El máximo de caracteres en el correo son 150.";
    }
  }

  // Validación de la dirección
  if (direccion) {
    if (direccion.length > 150) {
      errors.direccion = "La dirección debe contener máximo 150 caracteres.";
    }
  }

  return errors;
}