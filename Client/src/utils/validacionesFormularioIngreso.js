const regexSoloNumeros = /^\d+$/;
const regexNombresApellidos = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/;
const regexRIF = /^[A-Z0-9-]+$/;
const regexTelefono = /^\+[1-9]\d*$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexNumerosLetrasGuionesApostrofes = /^[A-Za-zÀ-ÿ0-9' -]+$/;
const regexSoloNumerosYLetras = /^[A-Za-z0-9]+$/;

import { calcularMaxFechaNacimiento } from "./formatearFecha";

export default function validations(inputs) {
  const errors = {};

  const {
    tipo_identificacion,
    numero_identificacion,
    nombres,
    apellidos,
    rif,
    telefono,
    correo,
    fecha_nacimiento,
    nacimiento_lugar,
    urbanizacion_sector,
    calle_avenida,
    numero_casa,
    apartamento,
    talla_camisa,
    talla_pantalon,
    talla_calzado,
    nombre_instituto,
    titulo_obtenido,
    fecha_desde_titulo,
    fecha_hasta_titulo,
    empresa_centro_educativo,
    fecha_desde_experiencia,
    fecha_hasta_experiencia,
    cargo_titulo,
    trabajo_anteriormente_especifique,
    motivo_retiro,
    nombre_apellido_referencia,
    direccion_referencia,
    telefono_referencia,
    ocupacion,
    alergia_especifique,
    cicatriz_especifique,
    nombre_apellido_contacto_emergencia,
    telefono_contacto_emergencia,
    direccion_contacto_emergencia,
    numero_cuenta,
    tipo_identificacion_tercero,
    numero_identificacion_tercero,
    nombre_apellido_tercero,
    salario,
  } = inputs;

  if (tipo_identificacion && numero_identificacion) {
    if (
      tipo_identificacion === "V" &&
      !regexSoloNumeros.test(numero_identificacion)
    ) {
      // Si es una cedula y contiene letras, marca el error
      errors.numero_identificacion =
        "El número de identificación debe contener solo números";
    }
  }

  if (nombres) {
    if (!regexNombresApellidos.test(nombres)) {
      errors.nombres =
        "El nombre solo puede contener letras, espacios, guiones o apóstofres";
    }
  }

  if (apellidos) {
    if (!regexNombresApellidos.test(apellidos)) {
      errors.apellidos =
        "El nombre solo puede contener letras, espacios, guiones o apóstofres";
    }
  }

  if (rif) {
    if (!regexRIF.test(rif)) {
      errors.rif =
        "El RIF solo puede contener letras mayúsculas, guiones o números";
    }
  }

  if (telefono) {
    if (!regexTelefono.test(telefono)) {
      errors.telefono = "Teléfono inválido (Ejemplo: +58412XXXXXXX)";
    } else if (telefono.length < 11) {
      errors.telefono = "El teléfono debe contener al menos 11 caracteres";
    }
  }

  if (correo) {
    if (!regexEmail.test(correo)) {
      errors.correo =
        "Correo electrónico inválido (Ejemplo: ejemplo@ejemplo.com)";
    }
  }

  if (fecha_nacimiento) {
    if (fecha_nacimiento > calcularMaxFechaNacimiento()) {
      errors.fecha_nacimiento = "El empleado debe ser mayor de edad (+18)";
    }
  }

  if (nacimiento_lugar) {
    if (!regexNombresApellidos.test(nacimiento_lugar)) {
      errors.nacimiento_lugar =
        "El lugar de nacimiento solo puede contener letras, espacios, guiones o apóstofres";
    }
  }

  if (urbanizacion_sector) {
    if (!regexNumerosLetrasGuionesApostrofes.test(urbanizacion_sector)) {
      errors.urbanizacion_sector =
        "La urbanización / sector solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (calle_avenida) {
    if (!regexNumerosLetrasGuionesApostrofes.test(calle_avenida)) {
      errors.calle_avenida =
        "La calle / avenida solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (numero_casa) {
    if (!regexNumerosLetrasGuionesApostrofes.test(numero_casa)) {
      errors.numero_casa =
        "El número de casa solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (apartamento) {
    if (!regexNumerosLetrasGuionesApostrofes.test(apartamento)) {
      errors.apartamento =
        "El apartamento solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (talla_camisa) {
    if (!regexSoloNumerosYLetras.test(talla_camisa)) {
      errors.talla_camisa = "La talla solo puede contener letras o números";
    }
  }

  if (talla_pantalon) {
    if (!regexSoloNumerosYLetras.test(talla_pantalon)) {
      errors.talla_pantalon = "La talla solo puede contener letras o números";
    }
  }

  if (talla_calzado) {
    if (!regexSoloNumerosYLetras.test(talla_calzado)) {
      errors.talla_calzado = "La talla solo puede contener letras o números";
    }
  }

  if (nombre_instituto) {
    if (!regexNumerosLetrasGuionesApostrofes.test(nombre_instituto)) {
      errors.nombre_instituto =
        "El nombre del instituto solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (titulo_obtenido) {
    if (!regexNumerosLetrasGuionesApostrofes.test(titulo_obtenido)) {
      errors.titulo_obtenido =
        "El título obtenido solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (fecha_desde_titulo && fecha_hasta_titulo) {
    if (fecha_hasta_titulo <= fecha_desde_titulo) {
      errors.fecha_titulo =
        "La (fecha hasta) del título obtenido no puede ser igual o menor que la (fecha desde)";
    }
  }

  if (empresa_centro_educativo) {
    if (!regexNumerosLetrasGuionesApostrofes.test(empresa_centro_educativo)) {
      errors.empresa_centro_educativo =
        "El nombre de la empresa solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (cargo_titulo) {
    if (!regexNumerosLetrasGuionesApostrofes.test(cargo_titulo)) {
      errors.cargo_titulo =
        "El cargo solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (fecha_desde_experiencia && fecha_hasta_experiencia) {
    if (fecha_hasta_experiencia <= fecha_desde_experiencia) {
      errors.fecha_experiencia =
        "La (fecha hasta) de la experiencia no puede ser igual o menor que la (fecha desde)";
    }
  }

  if (trabajo_anteriormente_especifique) {
    if (
      !regexNumerosLetrasGuionesApostrofes.test(
        trabajo_anteriormente_especifique
      )
    ) {
      errors.trabajo_anteriormente_especifique =
        "La especificación solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (motivo_retiro) {
    if (!regexNumerosLetrasGuionesApostrofes.test(motivo_retiro)) {
      errors.motivo_retiro =
        "El motivo de retiro solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (nombre_apellido_referencia) {
    if (!regexNombresApellidos.test(nombre_apellido_referencia)) {
      errors.nombre_apellido_referencia =
        "Los nombres y apellidos solo pueden contener letras, espacios, guiones o apóstofres";
    }
  }

  if (direccion_referencia) {
    if (!regexNumerosLetrasGuionesApostrofes.test(direccion_referencia)) {
      errors.direccion_referencia =
        "La urbanización / sector solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (telefono_referencia) {
    if (!regexTelefono.test(telefono_referencia)) {
      errors.telefono_referencia = "Teléfono inválido (Ejemplo: +58412XXXXXXX)";
    } else if (telefono_referencia.length < 11) {
      errors.telefono_referencia =
        "El teléfono debe contener al menos 11 caracteres";
    }
  }

  if (ocupacion) {
    if (!regexNumerosLetrasGuionesApostrofes.test(ocupacion)) {
      errors.ocupacion =
        "La ocupación solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (alergia_especifique) {
    if (!regexNumerosLetrasGuionesApostrofes.test(alergia_especifique)) {
      errors.alergia_especifique =
        "La especificación solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (cicatriz_especifique) {
    if (!regexNumerosLetrasGuionesApostrofes.test(cicatriz_especifique)) {
      errors.cicatriz_especifique =
        "La especificación solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (nombre_apellido_contacto_emergencia) {
    if (!regexNombresApellidos.test(nombre_apellido_contacto_emergencia)) {
      errors.nombre_apellido_contacto_emergencia =
        "Los nombres y apellidos solo pueden contener letras, espacios, guiones o apóstofres";
    }
  }

  if (telefono_contacto_emergencia) {
    if (!regexTelefono.test(telefono_contacto_emergencia)) {
      errors.telefono_contacto_emergencia =
        "Teléfono inválido (Ejemplo: +58412XXXXXXX)";
    } else if (telefono_contacto_emergencia.length < 11) {
      errors.telefono_contacto_emergencia =
        "El teléfono debe contener al menos 11 caracteres";
    }
  }

  if (direccion_contacto_emergencia) {
    if (
      !regexNumerosLetrasGuionesApostrofes.test(direccion_contacto_emergencia)
    ) {
      errors.direccion_contacto_emergencia =
        "La dirección solo puede contener letras, números, espacios, guiones o apóstofres";
    }
  }

  if (numero_cuenta) {
    if (!regexSoloNumeros.test(numero_cuenta)) {
      errors.numero_cuenta = "El número de cuenta solo puede contener números";
    } else if (numero_cuenta.length < 20) {
      errors.numero_cuenta =
        "El número de cuenta debe contener al menos 20 números";
    }
  }

  if (tipo_identificacion_tercero && numero_identificacion_tercero) {
    if (
      tipo_identificacion_tercero === "V" &&
      !regexSoloNumeros.test(numero_identificacion_tercero)
    ) {
      // Si es una cedula y contiene letras, marca el error
      errors.numero_identificacion_tercero =
        "El número de identificación debe contener solo números";
    }
  }

  if (nombre_apellido_tercero) {
    if (!regexNombresApellidos.test(nombre_apellido_tercero)) {
      errors.nombre_apellido_tercero =
        "Los nombres y apellidos solo pueden contener letras, espacios, guiones o apóstofres";
    }
  }

  if (salario) {
    if (salario.length > 8) {
      errors.salario = "El salario no debe tener más de 8 dígitos";
    }
  }

  return errors;
}
