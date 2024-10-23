export const sanarTextoAPI = (string) => {
  // Eliminar espacios en blanco innecesarios y colocar en mayúsculas
  return string
    .replace(/\s{2,}/g, " ")
    .trim()
    .toUpperCase();
};
