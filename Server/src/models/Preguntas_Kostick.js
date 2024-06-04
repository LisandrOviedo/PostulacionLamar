const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Preguntas_Kostick", {
    pregunta_kostick_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    numero_pregunta: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: 'El campo "numero_pregunta" debe contener solo números',
        },
        isInt: {
          args: true,
          msg: 'El campo "numero_pregunta" debe ser un número entero',
        },
      },
    },
    respuesta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
