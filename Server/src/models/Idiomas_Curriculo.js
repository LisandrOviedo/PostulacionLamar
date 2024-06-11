const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Idiomas_Curriculo", {
    idioma_empleado_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
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
