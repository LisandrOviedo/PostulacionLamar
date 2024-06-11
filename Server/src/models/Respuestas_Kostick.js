const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Respuestas_Kostick", {
    respuesta_kostick_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    prueba_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    pregunta_kostick_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
