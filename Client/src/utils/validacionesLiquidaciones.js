const regexSoloNumeros = /^\d+$/;
const regexCaracteresEspeciales = /[!@#$%^&*(),.?":{}|<>~`-]/;
export default function validations(inputs) {
  const errors = {};

  const { tipo_identificacion, numero_identificacion, codigo, fecha, anticipos_prestamos, bonificacion, poliza_hcm } = inputs;

  if (tipo_identificacion && numero_identificacion) {
    if (
      tipo_identificacion === "V" &&
      !regexSoloNumeros.test(numero_identificacion)
    ) {
      // Si es una cedula y contiene letras, marca el error
      errors.numero_identificacion =
        "El número de identificación debe contener solo números";
    } else if (numero_identificacion.length > 20) {
      errors.numero_identificacion =
        "El número de identificación debe contener máximo 20 números";
    }
  }

  if (codigo) {
    if (regexCaracteresEspeciales.test(codigo)) {
      errors.codigo = "El código solo debe contener números o letras";
    } else if (codigo.length === 1) {
      errors.codigo = "El código debe ser de al menos 2 caracteres";
    } else if (codigo.length > 8) {
      errors.codigo = "El código no debe ser mayor a 8 caracteres";
    }
  }
  if (anticipos_prestamos) {
    if (anticipos_prestamos.length > 8) {
      errors.anticipos_prestamos = "El anticipo o prestamo no debe tener más de 8 dígitos";
    }
  }


  if (bonificacion) {
    if (bonificacion.length > 8) {
      errors.bonificacion = "La bonificación no debe tener más de 8 dígitos";
    }
  }
  
  if (poliza_hcm) {
    if (poliza_hcm.length > 8) {
      errors.poliza_hcm = "La Poliza HCM no debe tener más de 8 dígitos";
    }
  }

  //Revisar con Lisandro
  if (fecha) {
    if (Fichas_Ingresos < fecha_egreso) {
      errors.fecha(
        "La fecha de egreso no puede ser menor a la fecha de ingreso."
      );
    }
  }

  return errors;
}
