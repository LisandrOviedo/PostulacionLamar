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
  Area_Interes_Curriculo,
  Areas_Interes,
  Cargo_Empleado,
  Cargo,
  Ciudades,
  Contactos_Emergencia,
  Curriculo,
  Datos_Bancarios,
  Documentos_Empleado,
  Empleado,
  Empresa,
  Estado,
  Etnia,
  Experiencia,
  Ficha_Ingreso,
  Idioma,
  Menu,
  Municipio,
  Paises,
  Parroquia,
  Idiomas_Curriculo,
  Preguntas_Kostick,
  Pruebas_Empleado,
  Referencias_Personales,
  Respuestas_Kostick,
  Roles,
  Salud,
  Sesiones,
  Titulo_Obtenido,
} = sequelize.models;

// RELACIONES DE MODELOS (TABLAS)
// Roles 1:M Empleados
Roles.hasMany(Empleado, {
  foreignKey: {
    name: "rol_id",
  },
});
Empleado.belongsTo(Roles, {
  foreignKey: {
    name: "rol_id",
  },
});

// Curriculo 1:1 Empleado
Curriculo.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});
Empleado.hasOne(Curriculo, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Areas_Interes M:M Curriculo
Areas_Interes.belongsToMany(Curriculo, {
  through: "Area_Interes_Curriculo",
  foreignKey: {
    name: "area_interes_id",
  },
});
Curriculo.belongsToMany(Areas_Interes, {
  through: "Area_Interes_Curriculo",
  foreignKey: {
    name: "curriculo_id",
  },
});

// Empleado M:M Cargo
Empleado.belongsToMany(Cargo, {
  through: "Cargo_Empleado",
  foreignKey: {
    name: "empleado_id",
  },
});
Cargo.belongsToMany(Empleado, {
  through: "Cargo_Empleado",
  foreignKey: {
    name: "cargo_id",
  },
});

// Empresa 1:M Cargo
Empresa.hasMany(Cargo, {
  foreignKey: {
    name: "empresa_id",
  },
});
Cargo.belongsTo(Empresa, {
  foreignKey: {
    name: "empresa_id",
  },
});

// Empleado 1:M Titulo_Obtenido
Empleado.hasMany(Titulo_Obtenido, {
  foreignKey: {
    name: "empleado_id",
  },
});
Titulo_Obtenido.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleado 1:M Experiencia
Empleado.hasMany(Experiencia, {
  foreignKey: {
    name: "empleado_id",
  },
});
Experiencia.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleado 1:M Documentos_Empleado
Empleado.hasMany(Documentos_Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});
Documentos_Empleado.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleado 1:M Pruebas_Empleado
Empleado.hasMany(Pruebas_Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});
Pruebas_Empleado.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Pruebas_Empleado M:M Preguntas_Kostick
Pruebas_Empleado.belongsToMany(Preguntas_Kostick, {
  through: "Respuestas_Kostick",
  foreignKey: {
    name: "prueba_id",
  },
});
Preguntas_Kostick.belongsToMany(Pruebas_Empleado, {
  through: "Respuestas_Kostick",
  foreignKey: {
    name: "pregunta_kostick_id",
  },
});

// Curriculo M:M Idioma
Curriculo.belongsToMany(Idioma, {
  through: "Idiomas_Curriculo",
  foreignKey: {
    name: "curriculo_id",
  },
});
Idioma.belongsToMany(Curriculo, {
  through: "Idiomas_Curriculo",
  foreignKey: {
    name: "idioma_id",
  },
});

// Sesiones 1:1 Empleado
Sesiones.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});
Empleado.hasOne(Sesiones, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Etnia 1:M Empleado
Etnia.hasMany(Empleado, {
  foreignKey: {
    name: "etnia_id",
  },
});
Empleado.belongsTo(Etnia, {
  foreignKey: {
    name: "etnia_id",
  },
});

// Paises 1:M Estado
Paises.hasMany(Estado, {
  foreignKey: {
    name: "pais_id",
  },
});
Estado.belongsTo(Paises, {
  foreignKey: {
    name: "pais_id",
  },
});

// Estado 1:M Ciudades
Estado.hasMany(Ciudades, {
  foreignKey: {
    name: "estado_id",
  },
});
Ciudades.belongsTo(Estado, {
  foreignKey: {
    name: "estado_id",
  },
});

// Ciudades 1:M Municipio
Ciudades.hasMany(Municipio, {
  foreignKey: {
    name: "ciudad_id",
  },
});
Municipio.belongsTo(Ciudades, {
  foreignKey: {
    name: "ciudad_id",
  },
});

// Municipio 1:M Parroquia
Municipio.hasMany(Parroquia, {
  foreignKey: {
    name: "municipio_id",
  },
});
Parroquia.belongsTo(Municipio, {
  foreignKey: {
    name: "municipio_id",
  },
});

// Ciudades 1:M Empleado
Ciudades.hasMany(Empleado, {
  foreignKey: {
    name: "nacimiento_ciudad_id",
  },
});
Empleado.belongsTo(Ciudades, {
  foreignKey: {
    name: "nacimiento_ciudad_id",
  },
});

// Estado 1:M Empleado
Estado.hasMany(Empleado, {
  foreignKey: {
    name: "nacimiento_estado_id",
  },
});
Empleado.belongsTo(Estado, {
  foreignKey: {
    name: "nacimiento_estado_id",
  },
});

// Paises 1:M Empleado
Paises.hasMany(Empleado, {
  foreignKey: {
    name: "nacimiento_pais_id",
  },
});
Empleado.belongsTo(Paises, {
  foreignKey: {
    name: "nacimiento_pais_id",
  },
});

// Parroquia 1:M Empleado
Parroquia.hasMany(Empleado, {
  foreignKey: {
    name: "parroquia_id",
  },
});
Empleado.belongsTo(Parroquia, {
  foreignKey: {
    name: "parroquia_id",
  },
});

// Municipio 1:M Empleado
Municipio.hasMany(Empleado, {
  foreignKey: {
    name: "municipio_id",
  },
});
Empleado.belongsTo(Municipio, {
  foreignKey: {
    name: "municipio_id",
  },
});

// Estado 1:M Empleado
Estado.hasMany(Empleado, {
  foreignKey: {
    name: "estado_id",
  },
});
Empleado.belongsTo(Estado, {
  foreignKey: {
    name: "estado_id",
  },
});

// Paises 1:M Empleado
Paises.hasMany(Empleado, {
  foreignKey: {
    name: "pais_id",
  },
});
Empleado.belongsTo(Paises, {
  foreignKey: {
    name: "pais_id",
  },
});

// Empleado 1:M Salud
Empleado.hasMany(Salud, {
  foreignKey: {
    name: "empleado_id",
  },
});
Salud.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleado 1:M Contactos_Emergencia
Empleado.hasMany(Contactos_Emergencia, {
  foreignKey: {
    name: "empleado_id",
  },
});
Contactos_Emergencia.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Empleado 1:M Referencias_Personales
Empleado.hasMany(Referencias_Personales, {
  foreignKey: {
    name: "empleado_id",
  },
});
Referencias_Personales.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Datos_Bancarios 1:1 Empleado
Datos_Bancarios.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});
Empleado.hasOne(Datos_Bancarios, {
  foreignKey: {
    name: "empleado_id",
  },
});

// Ficha_Ingreso 1:1 Empleado
Ficha_Ingreso.belongsTo(Empleado, {
  foreignKey: {
    name: "empleado_id",
  },
});
Empleado.hasOne(Ficha_Ingreso, {
  foreignKey: {
    name: "empleado_id",
  },
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Area_Interes_Curriculo,
  Areas_Interes,
  Cargo_Empleado,
  Cargo,
  Ciudades,
  Contactos_Emergencia,
  Curriculo,
  Datos_Bancarios,
  Documentos_Empleado,
  Empleado,
  Empresa,
  Estado,
  Etnia,
  Experiencia,
  Ficha_Ingreso,
  Idioma,
  Menu,
  Municipio,
  Paises,
  Parroquia,
  Idiomas_Curriculo,
  Preguntas_Kostick,
  Pruebas_Empleado,
  Referencias_Personales,
  Respuestas_Kostick,
  Roles,
  Salud,
  Sesiones,
  Titulo_Obtenido,
};
