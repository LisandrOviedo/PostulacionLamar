const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Vacantes_Empleados", {
    vacante_empleado_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vacante_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado_solicitud: {
      type: DataTypes.ENUM("Pendiente por revisar", "Revisado", "Aprobado"),
      defaultValue: "Pendiente por revisar",
    },
    revisado_por_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
