const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cargo_Empleado", {
    cargo_empleado_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    cargo_id: {
      // Campo relacionado
      type: DataTypes.UUID,
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
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'El campo "fecha_ingreso" debe ser una fecha válida',
        },
      },
    },
    fecha_egreso: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: 'El campo "fecha_egreso" debe ser una fecha válida',
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
