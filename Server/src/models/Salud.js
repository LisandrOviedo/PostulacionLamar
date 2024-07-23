const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Salud", {
    salud_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alergia_medicamentos: {
      type: DataTypes.ENUM("Si", "No"),
      allowNull: false,
    },
    alergia_alimentos: {
      type: DataTypes.ENUM("Si", "No"),
      allowNull: false,
    },
    alergia_otros: {
      type: DataTypes.ENUM("Si", "No"),
      allowNull: false,
    },
    alergia_especifique: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fuma: {
      type: DataTypes.ENUM("Si", "No"),
      allowNull: false,
    },
    cicatriz_especifique: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
