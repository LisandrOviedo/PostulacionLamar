const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Respuestas_Empleado", {
    respuestas_empleado_id: {
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
    respuesta_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
