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

module.exports = {
  DDMMYYYYHHMM,
  calcularEdad,
};
