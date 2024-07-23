const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cargos", {
    cargo_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empresa_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_nomina: {
      type: DataTypes.STRING(12),
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
