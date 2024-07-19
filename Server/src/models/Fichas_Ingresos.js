const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Fichas_Ingresos", {
    ficha_ingreso_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo_revision_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cargo_id: {
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
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
