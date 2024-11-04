export default function validations(inputs) {
  const errors = {};

  const { fecha_desde, fecha_hasta } = inputs;

  if (fecha_desde && fecha_hasta) {
    if (fecha_hasta <= fecha_desde) {
      errors.fechas =
        "La fecha (hasta) no puede ser menor o igual a la (desde)";
    }
  }

  return errors;
}
