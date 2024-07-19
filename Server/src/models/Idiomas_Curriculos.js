const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Idiomas_Curriculos", {
    idioma_empleado_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    curriculo_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    idioma_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    nivel: {
      type: DataTypes.ENUM("Principiante", "Intermedio", "Avanzado"),
      defaultValue: "Principiante",
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
