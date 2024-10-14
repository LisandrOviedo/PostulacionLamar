const regexNombresApellidos = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/;
const regexNumerosLetrasGuionesApostrofes = /^[A-Za-zÀ-ÿ0-9' -]+$/;

export default function validations(inputs) {
  const errors = {};

  const {
    nombre_instituto,
    titulo_obtenido,
    cargo_titulo,
    empresa_centro_educativo,
    habilidades_tecnicas,
    fecha_desde_titulo_obtenido,
    fecha_hasta_titulo_obtenido,
    fecha_desde_experiencia,
    fecha_hasta_experiencia,
  } = inputs;

  if (nombre_instituto) {
    if (!regexNumerosLetrasGuionesApostrofes.test(nombre_instituto)) {
      errors.nombre_instituto =
        "El nombre solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (titulo_obtenido) {
    if (!regexNombresApellidos.test(titulo_obtenido)) {
      errors.titulo_obtenido =
        "El título obtenido solo puede contener letras, espacios, guiones o apóstofres";
    }
  }

  if (cargo_titulo) {
    if (!regexNumerosLetrasGuionesApostrofes.test(cargo_titulo)) {
      errors.cargo_titulo =
        "El cargo o título solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (empresa_centro_educativo) {
    if (!regexNumerosLetrasGuionesApostrofes.test(empresa_centro_educativo)) {
      errors.empresa_centro_educativo =
        "El nombre de la empresa solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (habilidades_tecnicas) {
    if (!regexNumerosLetrasGuionesApostrofes.test(habilidades_tecnicas)) {
      errors.habilidades_tecnicas =
        "Las habilidades técnicas solo pueden contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (fecha_desde_titulo_obtenido && fecha_hasta_titulo_obtenido) {
    if (fecha_hasta_titulo_obtenido <= fecha_desde_titulo_obtenido) {
      errors.fecha_titulo_obtenido =
        "La (fecha hasta) del título obtenido no puede ser igual o menor que la (fecha desde)";
    }
  }

  if (fecha_desde_experiencia && fecha_hasta_experiencia) {
    if (fecha_hasta_experiencia <= fecha_desde_experiencia) {
      errors.fecha_experiencia =
        "La (fecha hasta) del título obtenido no puede ser igual o menor que la (fecha desde)";
    }
  }

  return errors;
}
