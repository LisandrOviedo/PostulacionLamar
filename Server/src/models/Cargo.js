const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cargo", {
    cargo_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    empresa_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    codigo_empresa: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    tipo_nomina: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    codigo_cargo: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    salario: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: 'El campo "salario" debe ser un número decimal',
        },
      },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
