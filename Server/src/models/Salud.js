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
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    alergia_alimentos: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    alergia_otros: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    alergia_especifique: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fuma: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cicatriz_especifique: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
