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

const { Usuario, Empleado, Areas_Interes, Curriculo } = sequelize.models;

// RELACIONES DE MODELOS (TABLAS)
// Empleado 1:1 Curriculo
Empleado.hasOne(Curriculo, {
  foreignKey: {
    allowNull: false,
    name: "empleado_id",
    onDelete: "RESTRICT", // Configurar el comportamiento de eliminación a RESTRICT
    onUpdate: "RESTRICT", // Configurar el comportamiento de actualización a RESTRICT
  },
});
Curriculo.belongsTo(Empleado, {
  foreignKey: {
    allowNull: false,
    name: "empleado_id",
  },
});

// Areas_Interes 1:N Direcciones
Areas_Interes.hasMany(Curriculo, {
  foreignKey: {
    allowNull: false,
    name: "area_interes_id",
    onDelete: "RESTRICT", // Configurar el comportamiento de eliminación a RESTRICT
    onUpdate: "RESTRICT", // Configurar el comportamiento de actualización a RESTRICT
  },
});
Curriculo.belongsTo(Areas_Interes, {
  foreignKey: {
    allowNull: false,
    name: "area_interes_id",
  },
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Usuario,
  Empleado,
  Areas_Interes,
  Curriculo,
};
