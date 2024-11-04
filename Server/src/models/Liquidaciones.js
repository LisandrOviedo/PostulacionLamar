const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Liquidaciones", {
    liquidacion_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    cargo_empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_egreso: {
      type: DataTypes.DATEONLY,
    },
    motivo_retiro: {
      type: DataTypes.ENUM("Abandono", "Despido", "Renuncia"),
      allowNull: false,
    },
  });
};
