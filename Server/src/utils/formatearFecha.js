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

module.exports = {
  DDMMYYYYHHMM,
};
