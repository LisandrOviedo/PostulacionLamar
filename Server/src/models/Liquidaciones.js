// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   sequelize.define("Liquidaciones", {
//     liquidacion_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true, //preguntar
//       primaryKey: true,
//     },
//     codigo: {
//       // Campo relacionado
//       type: DataTypes.STRING(10),
//       allowNull: false, //preguntar
//     },

//     cargo_empleado_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true, //preguntar
//     },

//     fecha_egreso: {
//       type: DataTypes.INTEGER,
//     },
//     motivo_retiro: {
//         type: DataTypes.ENUM("Abandono", "Despido", "Renuncia"),
//         allowNull: false,
//       },

//   });
// };
