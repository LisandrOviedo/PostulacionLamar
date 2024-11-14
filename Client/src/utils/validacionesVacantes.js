const regexNumerosLetrasGuionesApostrofes = /^[A-Za-zÀ-ÿ0-9' -]+$/;

export default function validations(inputs) {
  const errors = {};

  const { nombre, ubicacion, departamento, nivel_educativo } = inputs;

  if (nombre) {
    if (!regexNumerosLetrasGuionesApostrofes.test(nombre)) {
      errors.nombre =
        "El nombre solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (ubicacion) {
    if (!regexNumerosLetrasGuionesApostrofes.test(ubicacion)) {
      errors.ubicacion =
        "La ubicación solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (departamento) {
    if (!regexNumerosLetrasGuionesApostrofes.test(departamento)) {
      errors.departamento =
        "El departamento solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (nivel_educativo) {
    if (!regexNumerosLetrasGuionesApostrofes.test(nivel_educativo)) {
      errors.nivel_educativo =
        "El nivel educativo solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  return errors;
}
