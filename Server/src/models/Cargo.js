const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cargo", {
    cargo_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    codigo_empresa: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    tipo_nomina: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    codigo_cargo: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    codigo_cargo_nuevo: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    descripcion_nuevo: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    salario: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
