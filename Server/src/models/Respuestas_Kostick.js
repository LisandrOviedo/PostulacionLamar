const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Respuestas_Kostick", {
    respuesta_kostick_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prueba_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pregunta_kostick_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
