const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cargos", {
    cargo_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    departamento_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigo_cargo: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    descripcion_cargo_antiguo: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
