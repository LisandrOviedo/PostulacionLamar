import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Preguntas_Kostick", {
    pregunta_kostick_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numero_pregunta: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    respuesta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
