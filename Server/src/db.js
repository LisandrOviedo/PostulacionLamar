const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

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
  Cargos,
  Ciudades,
  Contactos_Emergencia,
  Curriculos,
  Datos_Bancarios,
  Direcciones,
  Documentos_Empleados,
  Empleados,
  Empresas,
  Estados,
  Etnias,
  Experiencias,
  Fichas_Ingresos,
  Idiomas,
  Menus,
  Municipios,
  Paises,
  Parroquias,
  Idiomas_Curriculos,
  Preguntas_Kostick,
  Pruebas_Empleados,
  Referencias_Personales,
  Respuestas_Kostick,
  Revisiones_Fichas_Ingresos,
  Roles,
  Salud,
  Sesiones,
  Titulos_Obtenidos,
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

// Empleados M:M Cargos
Empleados.belongsToMany(Cargos, {
  through: "Cargos_Empleados",
  foreignKey: {
    name: "empleado_id",
  },
});
Cargos.belongsToMany(Empleados, {
  through: "Cargos_Empleados",
  foreignKey: {
    name: "cargo_id",
  },
});

// Empresas 1:M Cargos
Empresas.hasMany(Cargos, {
  foreignKey: {
    name: "empresa_id",
  },
});
Cargos.belongsTo(Empresas, {
  foreignKey: {
    name: "empresa_id",
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

// Estados 1:M Ciudades
Estados.hasMany(Ciudades, {
  foreignKey: {
    name: "estado_id",
  },
});
Ciudades.belongsTo(Estados, {
  foreignKey: {
    name: "estado_id",
  },
});

// Ciudades 1:M Municipios
Ciudades.hasMany(Municipios, {
  foreignKey: {
    name: "ciudad_id",
  },
});
Municipios.belongsTo(Ciudades, {
  foreignKey: {
    name: "ciudad_id",
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

// Ciudades 1:M Empleados
Ciudades.hasMany(Empleados, {
  foreignKey: {
    name: "nacimiento_ciudad_id",
  },
});
Empleados.belongsTo(Ciudades, {
  foreignKey: {
    name: "nacimiento_ciudad_id",
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

// Paises 1:M Empleados
Paises.hasMany(Empleados, {
  foreignKey: {
    name: "nacimiento_pais_id",
  },
});
Empleados.belongsTo(Paises, {
  foreignKey: {
    name: "nacimiento_pais_id",
  },
});

// Parroquias 1:M Empleados
Parroquias.hasMany(Empleados, {
  foreignKey: {
    name: "parroquia_id",
  },
});
Empleados.belongsTo(Parroquias, {
  foreignKey: {
    name: "parroquia_id",
  },
});

// Municipios 1:M Empleados
Municipios.hasMany(Empleados, {
  foreignKey: {
    name: "municipio_id",
  },
});
Empleados.belongsTo(Municipios, {
  foreignKey: {
    name: "municipio_id",
  },
});

// Estados 1:M Empleados
Estados.hasMany(Empleados, {
  foreignKey: {
    name: "estado_id",
  },
});
Empleados.belongsTo(Estados, {
  foreignKey: {
    name: "estado_id",
  },
});

// Paises 1:M Empleados
Paises.hasMany(Empleados, {
  foreignKey: {
    name: "pais_id",
  },
});
Empleados.belongsTo(Paises, {
  foreignKey: {
    name: "pais_id",
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

// Fichas_Ingresos 1:1 Empleados
Fichas_Ingresos.belongsTo(Empleados, {
  foreignKey: {
    name: "empleado_id",
  },
});
Empleados.hasOne(Fichas_Ingresos, {
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

// Revisiones_Fichas_Ingresos 1:M Fichas_Ingresos
Revisiones_Fichas_Ingresos.hasMany(Fichas_Ingresos, {
  foreignKey: {
    name: "revision_ficha_ingreso_id",
  },
});
Fichas_Ingresos.belongsTo(Revisiones_Fichas_Ingresos, {
  foreignKey: {
    name: "revision_ficha_ingreso_id",
  },
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Areas_Interes_Curriculos,
  Areas_Interes,
  Cargos_Empleados,
  Cargos,
  Ciudades,
  Contactos_Emergencia,
  Curriculos,
  Datos_Bancarios,
  Direcciones,
  Documentos_Empleados,
  Empleados,
  Empresas,
  Estados,
  Etnias,
  Experiencias,
  Fichas_Ingresos,
  Idiomas,
  Menus,
  Municipios,
  Paises,
  Parroquias,
  Idiomas_Curriculos,
  Preguntas_Kostick,
  Pruebas_Empleados,
  Referencias_Personales,
  Respuestas_Kostick,
  Revisiones_Fichas_Ingresos,
  Roles,
  Salud,
  Sesiones,
  Titulos_Obtenidos,
};
