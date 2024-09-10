const regexLetras = /^[a-zA-Z\s]+$/;
const regexLetrasComasPuntos = /^[a-zA-Z,'.\s]+$/;

export default function validations(inputs) {
  const {
    nombre_instituto,
    titulo_obtenido,
    cargo_titulo,
    empresa_centro_educativo,
  } = inputs;

  const errors = {};

  if (nombre_instituto) {
    if (!regexLetras.test(nombre_instituto)) {
      errors.nombre_instituto =
        "Solo está permitido escribir letras sin acentos";
    }
  }

  if (titulo_obtenido) {
    if (!regexLetras.test(titulo_obtenido)) {
      errors.titulo_obtenido =
        "Solo está permitido escribir letras sin acentos";
    }
  }

  if (cargo_titulo) {
    if (!regexLetras.test(cargo_titulo)) {
      errors.cargo_titulo = "Solo está permitido escribir letras";
    }
  }

  if (empresa_centro_educativo) {
    if (!regexLetras.test(empresa_centro_educativo)) {
      errors.empresa_centro_educativo = "Solo está permitido escribir letras";
    }
  }

  if (habilidades_tecnicas) {
    if (!regexLetrasComasPuntos.test(habilidades_tecnicas)) {
      errors.habilidades_tecnicas =
        "Solo está permitido escribir letras, comas simples y puntos";
    }
  }

  return errors;
}
