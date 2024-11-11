const regexNumerosLetrasGuionesApostrofes = /^[A-Za-zÀ-ÿ0-9' -]+$/;

export default function validations(inputs) {
  const errors = {};

  const { nombres, descripcion, ubicacion } = inputs;

  if (nombres) {
    if (!regexNumerosLetrasGuionesApostrofes.test(nombres)) {
      errors.nombres =
        "El nombre solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (descripcion) {
    if (!regexNumerosLetrasGuionesApostrofes.test(descripcion)) {
      errors.descripcion =
        "La descripción solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (ubicacion) {
    if (!regexNumerosLetrasGuionesApostrofes.test(ubicacion)) {
      errors.ubicacion =
        "La ubicación solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  return errors;
}
