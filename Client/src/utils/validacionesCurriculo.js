const regexLetras = /^[a-zA-Z\s]+$/;
const regexLetrasComasPuntos = /^[a-zA-Z,'.\s]+$/;

export default function validations(inputs) {
  const errors = {};

  if (inputs.titulo_obtenido && !regexLetras.test(inputs.titulo_obtenido)) {
    errors.titulo_obtenido = "Solo está permitido escribir letras sin acentos";
  }

  if (inputs.cargo_titulo && !regexLetras.test(inputs.cargo_titulo)) {
    errors.cargo_titulo = "Solo está permitido escribir letras";
  }

  if (
    inputs.empresa_centro_educativo &&
    !regexLetras.test(inputs.empresa_centro_educativo)
  ) {
    errors.empresa_centro_educativo = "Solo está permitido escribir letras";
  }

  if (
    inputs.habilidades_tecnicas &&
    !regexLetrasComasPuntos.test(inputs.habilidades_tecnicas)
  ) {
    errors.habilidades_tecnicas =
      "Solo está permitido escribir letras, comas simples y puntos";
  }

  return errors;
}
