export const DDMMYYYY = (fecha) => {
  const isoDateString = fecha;
  const isoDate = new Date(isoDateString);
  const day = String(isoDate.getDate()).padStart(2, "0");
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const year = String(isoDate.getFullYear());
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const YYYYMMDD = () => {
  const isoDateString = new Date();
  const isoDate = new Date(isoDateString);
  const day = String(isoDate.getDate()).padStart(2, "0");
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const year = String(isoDate.getFullYear());
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const YYYYMM = () => {
  const isoDateString = new Date();
  const isoDate = new Date(isoDateString);
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const year = String(isoDate.getFullYear());
  const formattedDate = `${year}-${month}`;

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

export const DDMMYYYYHHMM2 = (fecha) => {
  const fechaHoraActual = new Date(fecha);
  const dia = String(fechaHoraActual.getDate()).padStart(2, "0");
  const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, "0");
  const año = fechaHoraActual.getFullYear();
  const hora = String(fechaHoraActual.getHours()).padStart(2, "0");
  const minutos = String(fechaHoraActual.getMinutes()).padStart(2, "0");
  const segundos = String(fechaHoraActual.getSeconds()).padStart(2, "0");

  const fechaHoraFormateada = `${dia}-${mes}-${año} ${hora}:${minutos}:${segundos}`;

  return fechaHoraFormateada;
};

export const calcularAntiguedad = (fecha_ingreso) => {
  const fecha_actual = new Date(); // fecha actual del sistema
  const fechaIngreso = new Date(fecha_ingreso); // convertir fecha de ingreso a objeto Date
  // calcular la diferencia en milisegundos
  const diferencia = fecha_actual - fechaIngreso;
  // convertir milisegundos a días
  const antiguedad = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  return antiguedad;
};

export const calcularMaxFechaNacimiento = () => {
  // Función para calcular la fecha máxima permitida (18 años atrás)

  const fechaActual = new Date();
  const fechaMaxima = new Date(
    fechaActual.setFullYear(fechaActual.getFullYear() - 18)
  );
  return fechaMaxima.toISOString().split("T")[0]; // Formato YYYY-MM-DD
};
