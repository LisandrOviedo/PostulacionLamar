const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cargos_Empleados", {
    cargo_empleado_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cargo_nivel_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salario: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_egreso: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
