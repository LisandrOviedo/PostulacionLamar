export const DDMMYYYY = (fecha) => {
  const isoDateString = fecha;
  const isoDate = new Date(isoDateString);
  const day = String(isoDate.getDate()).padStart(2, "0");
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const year = String(isoDate.getFullYear());
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const calcularEdad = (edad) => {
  const today = new Date();
  const birthDate = new Date(edad);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
