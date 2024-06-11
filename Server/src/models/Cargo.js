const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cargo", {
    cargo_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    empresa_id: {
      // Campo relacionado
      type: DataTypes.UUID,
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
