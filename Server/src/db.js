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
  Areas_Interes,
  Cargo_Empleado,
  Cargo_Titulo,
  Cargo,
  Curriculo,
  Empleado,
  Empresa,
  Experiencia,
  Usuario,
} = sequelize.models;

// RELACIONES DE MODELOS (TABLAS)
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

// Areas_Interes 1:N Curriculo
Areas_Interes.hasMany(Curriculo, {
  foreignKey: {
    allowNull: false,
    name: "area_interes_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});
Curriculo.belongsTo(Areas_Interes, {
  foreignKey: {
    allowNull: false,
    name: "area_interes_id",
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

// Cargo_Titulo 1:N Experiencia
Cargo_Titulo.hasMany(Experiencia, {
  foreignKey: {
    allowNull: false,
    name: "cargo_titulo_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});
Experiencia.belongsTo(Cargo_Titulo, {
  foreignKey: {
    allowNull: false,
    name: "cargo_titulo_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
});

// Usuarios N:N Productos
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

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Areas_Interes,
  Cargo_Titulo,
  Cargo_Empleado,
  Cargo,
  Curriculo,
  Empleado,
  Empresa,
  Experiencia,
  Usuario,
};
