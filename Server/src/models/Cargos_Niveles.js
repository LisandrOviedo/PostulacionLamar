const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cargos_Niveles", {
    cargo_nivel_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cargo_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nivel_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salario_min: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    salario_max: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
