export const pruebaMenorATresMeses = (fecha_ultima_prueba) => {
  const fechaActual = new Date();
  const fechaUltimaPrueba = new Date(fecha_ultima_prueba);

  // Cálculo de la diferencia en meses
  const diferenciaMeses =
    fechaActual.getFullYear() * 12 +
    fechaActual.getMonth() -
    (fechaUltimaPrueba.getFullYear() * 12 + fechaUltimaPrueba.getMonth());

  // Devuelve true si la diferencia es menor a 3 meses, false en caso contrario
  return diferenciaMeses < 3;
};

export const cuandoPuedesAplicar = (fecha_ultima_prueba) => {
  let fechaUltimaPrueba = new Date(fecha_ultima_prueba);

  // Obtener el año, mes y día de la fecha original
  let anio = fechaUltimaPrueba.getFullYear();
  let mes = fechaUltimaPrueba.getMonth() + 1; // Los meses en JavaScript son de 0 a 11, así que sumamos 1
  let dia = fechaUltimaPrueba.getDate();

  // Sumar 3 meses
  mes += 3;

  // Ajustar el año si es necesario
  if (mes > 12) {
    anio++;
    mes -= 12;
  }

  // Crear la nueva fecha
  let nuevaFecha = new Date(anio, mes - 1, dia); // Restamos 1 al mes porque los meses son de 0 a 11

  // Devolver la nueva fecha en el formato deseado (día/mes/año)
  return `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${anio}`;
};
