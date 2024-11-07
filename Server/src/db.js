const { Sequelize } = require("sequelize");
const fs = require("node:fs");
const path = require("node:path");

const { DB, USERDB, PASSWORD, HOST, DIALECT, PORT_DB } = process.env;

const sequelize = new Sequelize(DB, USERDB, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT_DB,
  logging: false,
  native: false,
  timezone: "-04:00",
  define: {
    freezeTableName: true,
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Areas_Interes_Curriculos,
  Areas_Interes,
  Cargos_Empleados,
  Cargos_Niveles,
  Cargos,
  Clases_Movimientos,
  Contactos_Emergencia,
  Curriculos,
  Datos_Bancarios,
  Departamentos,
  Direcciones,
  Divisiones,
  Documentos_Empleados,
  Empleados,
  Empresas,
  Estados,
  Etnias,
  Experiencias,
  Fichas_Ingresos,
  Idiomas_Curriculos,
  Idiomas,
  Liquidaciones,
  Menus,
  Movimientos,
  Municipios,
  Paises,
  Parroquias,
  Preguntas_Kostick,
  Pruebas_Empleados,
  Referencias_Personales,
  Respuestas_Kostick,
  Roles_Menus,
  Roles,
  Salud,
  Sedes,
  Seguro_Social,
  Sesiones,
  Sugerencias_Pred,
  Sugerencias,
  Tipos_Sugerencias,
  Titulos_Obtenidos,
  Vacantes_Empleados,
  Vacantes,
} = sequelize.models;

// RELACIONES DE MODELOS (TABLAS)
// Roles 1:M Empleados
Roles.hasMany(Empleados, {
  foreignKey: {
    name: "rol_id",
  },
});
Empleados.belongsTo(Roles, {
  foreignKey: {
    name: "rol_id",
  },
});

// Curriculos 1:1 Empleados
Curriculos.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});
Empleados.hasOne(Curriculos, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleados 1:M Curriculos
Empleados.hasMany(Curriculos, {
  foreignKey: {
    name: "revisado_por_id",
  },
});
Curriculos.belongsTo(Empleados, {
  foreignKey: {
    name: "revisado_por_id",
  },
  as: "RevisadoPor",
});

// Areas_Interes M:M Curriculos
Areas_Interes.belongsToMany(Curriculos, {
  through: "Areas_Interes_Curriculos",
  foreignKey: {
    name: "area_interes_id",
  },
});
Curriculos.belongsToMany(Areas_Interes, {
  through: "Areas_Interes_Curriculos",
  foreignKey: {
    name: "curriculo_id",
  },
});

// Empleados 1:M Titulos_Obtenidos
Empleados.hasMany(Titulos_Obtenidos, {
  foreignKey: {
    name: "empleado_id",
  },
});
Titulos_Obtenidos.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleados 1:M Experiencias
Empleados.hasMany(Experiencias, {
  foreignKey: {
    name: "empleado_id",
  },
});
Experiencias.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleados 1:M Documentos_Empleados
Empleados.hasMany(Documentos_Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});
Documentos_Empleados.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleados 1:M Pruebas_Empleados
Empleados.hasMany(Pruebas_Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});
Pruebas_Empleados.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Pruebas_Empleados M:M Preguntas_Kostick
Pruebas_Empleados.belongsToMany(Preguntas_Kostick, {
  through: "Respuestas_Kostick",
  foreignKey: {
    name: "prueba_id",
  },
});
Preguntas_Kostick.belongsToMany(Pruebas_Empleados, {
  through: "Respuestas_Kostick",
  foreignKey: {
    name: "pregunta_kostick_id",
  },
});

// Curriculos M:M Idiomas
Curriculos.belongsToMany(Idiomas, {
  through: "Idiomas_Curriculos",
  foreignKey: {
    name: "curriculo_id",
  },
});
Idiomas.belongsToMany(Curriculos, {
  through: "Idiomas_Curriculos",
  foreignKey: {
    name: "idioma_id",
  },
});

// Sesiones 1:1 Empleados
Sesiones.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});
Empleados.hasOne(Sesiones, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Etnias 1:M Empleados
Etnias.hasMany(Empleados, {
  foreignKey: {
    name: "etnia_id",
  },
});
Empleados.belongsTo(Etnias, {
  foreignKey: {
    name: "etnia_id",
  },
});

// Paises 1:M Estados
Paises.hasMany(Estados, {
  foreignKey: {
    name: "pais_id",
  },
});
Estados.belongsTo(Paises, {
  foreignKey: {
    name: "pais_id",
  },
});

// Estados 1:M Municipios
Estados.hasMany(Municipios, {
  foreignKey: {
    name: "estado_id",
  },
});
Municipios.belongsTo(Estados, {
  foreignKey: {
    name: "estado_id",
  },
});

// Municipios 1:M Parroquias
Municipios.hasMany(Parroquias, {
  foreignKey: {
    name: "municipio_id",
  },
});
Parroquias.belongsTo(Municipios, {
  foreignKey: {
    name: "municipio_id",
  },
});

// Estados 1:M Empleados
Estados.hasMany(Empleados, {
  foreignKey: {
    name: "nacimiento_estado_id",
  },
});
Empleados.belongsTo(Estados, {
  foreignKey: {
    name: "nacimiento_estado_id",
  },
});

// Parroquias 1:M Direcciones
Parroquias.hasMany(Direcciones, {
  foreignKey: {
    name: "parroquia_id",
  },
});
Direcciones.belongsTo(Parroquias, {
  foreignKey: {
    name: "parroquia_id",
  },
});

// Municipios 1:M Direcciones
Municipios.hasMany(Direcciones, {
  foreignKey: {
    name: "municipio_id",
  },
});
Direcciones.belongsTo(Municipios, {
  foreignKey: {
    name: "municipio_id",
  },
});

// Empleados 1:M Salud
Empleados.hasMany(Salud, {
  foreignKey: {
    name: "empleado_id",
  },
});
Salud.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleados 1:M Contactos_Emergencia
Empleados.hasMany(Contactos_Emergencia, {
  foreignKey: {
    name: "empleado_id",
  },
});
Contactos_Emergencia.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleados 1:M Referencias_Personales
Empleados.hasMany(Referencias_Personales, {
  foreignKey: {
    name: "empleado_id",
  },
});
Referencias_Personales.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleados 1:M Datos_Bancarios
Empleados.hasMany(Datos_Bancarios, {
  foreignKey: {
    name: "empleado_id",
  },
});
Datos_Bancarios.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleados 1:M Direcciones
Empleados.hasMany(Direcciones, {
  foreignKey: {
    name: "empleado_id",
  },
});
Direcciones.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empresas 1:M Departamentos
Empresas.hasMany(Departamentos, {
  foreignKey: {
    name: "empresa_id",
  },
});
Departamentos.belongsTo(Empresas, {
  foreignKey: {
    name: "empresa_id",
  },
});

// Departamentos 1:M Cargos
Departamentos.hasMany(Cargos, {
  foreignKey: {
    name: "departamento_id",
  },
});
Cargos.belongsTo(Departamentos, {
  foreignKey: {
    name: "departamento_id",
  },
});

// Cargos 1:M Cargos_Niveles
Cargos.hasMany(Cargos_Niveles, {
  foreignKey: {
    name: "cargo_id",
  },
});
Cargos_Niveles.belongsTo(Cargos, {
  foreignKey: {
    name: "cargo_id",
  },
});

// Empleados 1:M Cargos_Empleados
Empleados.hasMany(Cargos_Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});
Cargos_Empleados.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Cargos_Niveles 1:M Cargos_Empleados
Cargos_Niveles.hasMany(Cargos_Empleados, {
  foreignKey: {
    name: "cargo_nivel_id",
  },
});
Cargos_Empleados.belongsTo(Cargos_Niveles, {
  foreignKey: {
    name: "cargo_nivel_id",
  },
});

// Empleados 1:M Fichas_Ingresos
Empleados.hasMany(Fichas_Ingresos, {
  foreignKey: {
    name: "empleado_id",
  },
});
Fichas_Ingresos.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Cargos_Niveles 1:M Fichas_Ingresos
Cargos_Niveles.hasMany(Fichas_Ingresos, {
  foreignKey: {
    name: "cargo_nivel_id",
  },
});
Fichas_Ingresos.belongsTo(Cargos_Niveles, {
  foreignKey: {
    name: "cargo_nivel_id",
  },
});

// Empresas 1:M Sedes
Empresas.hasMany(Sedes, {
  foreignKey: {
    name: "empresa_id",
  },
});
Sedes.belongsTo(Empresas, {
  foreignKey: {
    name: "empresa_id",
  },
});

// Empleados 1:M Movimientos
Empleados.hasMany(Movimientos, {
  foreignKey: {
    name: "empleado_id",
  },
});
Movimientos.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Clases_Movimientos 1:M Movimientos
Clases_Movimientos.hasMany(Movimientos, {
  foreignKey: {
    name: "clase_movimiento_id",
  },
});
Movimientos.belongsTo(Clases_Movimientos, {
  foreignKey: {
    name: "clase_movimiento_id",
  },
});

// Cargos_Niveles 1:M Movimientos
Cargos_Niveles.hasMany(Movimientos, {
  foreignKey: {
    name: "cargo_nivel_id",
  },
  as: "Nuevo_Cargo",
});
Movimientos.belongsTo(Cargos_Niveles, {
  foreignKey: {
    name: "cargo_nivel_id",
  },
  as: "Nuevo_Cargo",
});

// Empleados 1:M Movimientos
Empleados.hasMany(Movimientos, {
  foreignKey: {
    name: "solicitante_id",
  },
  as: "Solicitante",
});
Movimientos.belongsTo(Empleados, {
  foreignKey: {
    name: "solicitante_id",
  },
  as: "Solicitante",
});

// Empleados 1:M Movimientos
Empleados.hasMany(Movimientos, {
  foreignKey: {
    name: "supervisor_id",
  },
  as: "Supervisor",
});
Movimientos.belongsTo(Empleados, {
  foreignKey: {
    name: "supervisor_id",
  },
  as: "Supervisor",
});

// Empleados 1:M Movimientos
Empleados.hasMany(Movimientos, {
  foreignKey: {
    name: "gerencia_id",
  },
  as: "Gerencia",
});
Movimientos.belongsTo(Empleados, {
  foreignKey: {
    name: "gerencia_id",
  },
  as: "Gerencia",
});

// Empleados 1:M Movimientos
Empleados.hasMany(Movimientos, {
  foreignKey: {
    name: "tthh_id",
  },
  as: "TTHH",
});
Movimientos.belongsTo(Empleados, {
  foreignKey: {
    name: "tthh_id",
  },
  as: "TTHH",
});

// Empleados 1:M Movimientos
Empleados.hasMany(Movimientos, {
  foreignKey: {
    name: "revisado_por_id",
  },
});
Movimientos.belongsTo(Empleados, {
  foreignKey: {
    name: "revisado_por_id",
  },
  as: "RevisadoPor",
});

// Cargos_Empleados 1:M Movimientos
Cargos_Empleados.hasMany(Movimientos, {
  foreignKey: {
    name: "cargo_actual_id",
  },
  as: "Cargo_Actual",
});
Movimientos.belongsTo(Cargos_Empleados, {
  foreignKey: {
    name: "cargo_actual_id",
  },
  as: "Cargo_Actual",
});

// Tipos_Sugerencias 1:M Sugerencias
Tipos_Sugerencias.hasMany(Sugerencias, {
  foreignKey: {
    name: "tipo_sugerencia_id",
  },
});
Sugerencias.belongsTo(Tipos_Sugerencias, {
  foreignKey: {
    name: "tipo_sugerencia_id",
  },
});

// Empleados 1:M Sugerencias
Empleados.hasMany(Sugerencias, {
  foreignKey: {
    name: "revisado_por_id",
  },
});
Sugerencias.belongsTo(Empleados, {
  foreignKey: {
    name: "revisado_por_id",
  },
});

// Sedes 1:M Sugerencias
Sedes.hasMany(Sugerencias, {
  foreignKey: {
    name: "sede_id",
  },
});
Sugerencias.belongsTo(Sedes, {
  foreignKey: {
    name: "sede_id",
  },
});

// Empresas 1:M Empleados
Empresas.hasMany(Empleados, {
  foreignKey: {
    name: "empresa_id",
  },
});
Empleados.belongsTo(Empresas, {
  foreignKey: {
    name: "empresa_id",
  },
});

// Roles M:M Menus
Roles.belongsToMany(Menus, {
  through: "Roles_Menus",
  foreignKey: {
    name: "rol_id",
  },
});
Menus.belongsToMany(Roles, {
  through: "Roles_Menus",
  foreignKey: {
    name: "menu_id",
  },
});

Menus.belongsTo(Menus, { foreignKey: "padre_id", as: "Padre" });
Menus.hasMany(Menus, { foreignKey: "padre_id", as: "Sub_Menus" });

// Areas_Interes 1:M Vacantes
Areas_Interes.hasMany(Vacantes, {
  foreignKey: {
    name: "area_interes_id",
  },
});
Vacantes.belongsTo(Areas_Interes, {
  foreignKey: {
    name: "area_interes_id",
  },
});

// Vacantes M:M Empleados
Vacantes.belongsToMany(Empleados, {
  through: "Vacantes_Empleados",
  foreignKey: {
    name: "vacante_id",
  },
});
Empleados.belongsToMany(Vacantes, {
  through: "Vacantes_Empleados",
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleados 1:M Vacantes
Empleados.hasMany(Vacantes, {
  foreignKey: {
    name: "creado_por_id",
  },
  as: "CreadoPor",
});
Vacantes.belongsTo(Empleados, {
  foreignKey: {
    name: "creado_por_id",
  },
  as: "CreadoPor",
});

// Empleados 1:M Liquidaciones
Empleados.hasMany(Liquidaciones, {
  foreignKey: {
    name: "creado_por_id",
  },
  as: "RealizadoPor",
});
Liquidaciones.belongsTo(Empleados, {
  foreignKey: {
    name: "creado_por_id",
  },
  as: "RealizadoPor",
});

// Empleados 1:M Liquidaciones
Empleados.hasMany(Liquidaciones, {
  foreignKey: {
    name: "empleado_id",
  },
});
Liquidaciones.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Cargos_Empleados 1:M Liquidaciones
Cargos_Empleados.hasMany(Liquidaciones, {
  foreignKey: {
    name: "cargo_empleado_id",
  },
});
Liquidaciones.belongsTo(Cargos_Empleados, {
  foreignKey: {
    name: "cargo_empleado_id",
  },
});

// Seguro_Social 1:M Empresas
// Seguro_Social.hasMany(Empresas, {
//   foreignKey: {
//     name: "seguro_social_id",
//   },
// });
// Empresas.belongsTo(Seguro_Social, {
//   foreignKey: {
//     name: "seguro_social_id",
//   },
// });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Areas_Interes_Curriculos,
  Areas_Interes,
  Cargos_Empleados,
  Cargos_Niveles,
  Cargos,
  Clases_Movimientos,
  Contactos_Emergencia,
  Curriculos,
  Datos_Bancarios,
  Departamentos,
  Direcciones,
  Divisiones,
  Documentos_Empleados,
  Empleados,
  Empresas,
  Estados,
  Etnias,
  Experiencias,
  Fichas_Ingresos,
  Idiomas_Curriculos,
  Idiomas,
  Liquidaciones,
  Menus,
  Movimientos,
  Municipios,
  Paises,
  Parroquias,
  Preguntas_Kostick,
  Pruebas_Empleados,
  Referencias_Personales,
  Respuestas_Kostick,
  Roles_Menus,
  Roles,
  Salud,
  Sedes,
  Seguro_Social,
  Sesiones,
  Sugerencias_Pred,
  Sugerencias,
  Tipos_Sugerencias,
  Titulos_Obtenidos,
  Vacantes_Empleados,
  Vacantes,
};
