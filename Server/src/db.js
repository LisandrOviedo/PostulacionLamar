const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB, USER, PASSWORD, HOST, DIALECT, PORT_DB } = process.env;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT_DB,
  logging: false,
  native: false,
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
  Curriculo,
  Documentos_Empleado,
  Empleado,
  Empresa,
  Experiencia,
  Roles,
  Titulo_Obtenido,
} = sequelize.models;

// RELACIONES DE MODELOS (TABLAS)
// Roles 1:1 Empleado
Roles.hasOne(Empleado, {
  foreignKey: {
    allowNull: false,
    name: "rol_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});
Empleado.belongsTo(Roles, {
  foreignKey: {
    allowNull: false,
    name: "rol_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});

// Empleado 1:1 Curriculo
Empleado.hasOne(Curriculo, {
  foreignKey: {
    allowNull: false,
    name: "empleado_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});
Curriculo.belongsTo(Empleado, {
  foreignKey: {
    allowNull: false,
    name: "empleado_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});

// Areas_Interes N:N Curriculo
Areas_Interes.belongsToMany(Curriculo, {
  through: "Area_Interes_Curriculo",
  foreignKey: {
    allowNull: false,
    name: "area_interes_id",
  },
});
Curriculo.belongsToMany(Areas_Interes, {
  through: "Area_Interes_Curriculo",
  foreignKey: {
    allowNull: false,
    name: "curriculo_id",
  },
});

// Empleado N:N Cargo
Empleado.belongsToMany(Cargo, {
  through: "Cargo_Empleado",
  foreignKey: {
    allowNull: false,
    name: "empleado_id",
  },
});
Cargo.belongsToMany(Empleado, {
  through: "Cargo_Empleado",
  foreignKey: {
    allowNull: false,
    name: "cargo_id",
  },
});

// Empresa 1:N Cargo
Empresa.hasMany(Cargo, {
  foreignKey: {
    allowNull: false,
    name: "empresa_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});
Cargo.belongsTo(Empresa, {
  foreignKey: {
    allowNull: false,
    name: "empresa_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});

// Curriculo 1:N Titulo_Obtenido
Curriculo.hasMany(Titulo_Obtenido, {
  foreignKey: {
    allowNull: false,
    name: "curriculo_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});
Titulo_Obtenido.belongsTo(Curriculo, {
  foreignKey: {
    allowNull: false,
    name: "curriculo_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});

// Curriculo 1:N Experiencia
Curriculo.hasMany(Experiencia, {
  foreignKey: {
    allowNull: false,
    name: "curriculo_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});
Experiencia.belongsTo(Curriculo, {
  foreignKey: {
    allowNull: false,
    name: "curriculo_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});

// Empleado 1:N Documentos_Empleado
Empleado.hasMany(Documentos_Empleado, {
  foreignKey: {
    allowNull: false,
    name: "empleado_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});
Documentos_Empleado.belongsTo(Empleado, {
  foreignKey: {
    allowNull: false,
    name: "empleado_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Area_Interes_Curriculo,
  Areas_Interes,
  Cargo_Empleado,
  Cargo,
  Curriculo,
  Documentos_Empleado,
  Empleado,
  Empresa,
  Experiencia,
  Roles,
  Titulo_Obtenido,
};
