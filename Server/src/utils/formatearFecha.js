const DDMMYYYYHHMM = () => {
  const fechaHoraActual = new Date();
  const dia = String(fechaHoraActual.getDate()).padStart(2, "0");
  const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, "0");
  const año = fechaHoraActual.getFullYear();
  const hora = String(fechaHoraActual.getHours()).padStart(2, "0");
  const minutos = String(fechaHoraActual.getMinutes()).padStart(2, "0");
  const segundos = String(fechaHoraActual.getSeconds()).padStart(2, "0");

  const fechaHoraFormateada = `${dia}-${mes}-${año} ${hora}-${minutos}-${segundos}`;

  return fechaHoraFormateada;
};

const DDMMYYYYHHMM2 = () => {
  const fechaHoraActual = new Date();
  const dia = String(fechaHoraActual.getDate()).padStart(2, "0");
  const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, "0");
  const año = fechaHoraActual.getFullYear();
  const hora = String(fechaHoraActual.getHours()).padStart(2, "0");
  const minutos = String(fechaHoraActual.getMinutes()).padStart(2, "0");
  const segundos = String(fechaHoraActual.getSeconds()).padStart(2, "0");

  const fechaHoraFormateada = `${dia}-${mes}-${año} ${hora}:${minutos}:${segundos}`;

  return fechaHoraFormateada;
};

const DDMMYYYY = (fecha) => {
  const isoDateString = fecha;
  const isoDate = new Date(isoDateString);
  const day = String(isoDate.getDate()).padStart(2, "0");
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const year = String(isoDate.getFullYear());
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

const YYYYMMDD = (fecha) => {
  const date = new Date(fecha);

  return date.toISOString().slice(0, 10);
};

const calcularEdad = (edad) => {
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

const fechaHoraActual = () => {
  return `[${new Date().toLocaleString()}]`;
};

const calcularAntiguedad = (fecha_ingreso) => {
  const fecha_actual = new Date(); // fecha actual del sistema
  const fechaIngreso = new Date(fecha_ingreso); // convertir fecha de ingreso a objeto Date
  // calcular la diferencia en milisegundos
  const diferencia = fecha_actual - fechaIngreso;
  // convertir milisegundos a días
  const antiguedad = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  return antiguedad;
};

module.exports = {
  DDMMYYYYHHMM,
  DDMMYYYYHHMM2,
  DDMMYYYY,
  YYYYMMDD,
  calcularEdad,
  fechaHoraActual,
  calcularAntiguedad,
};
