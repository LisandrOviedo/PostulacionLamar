const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Sugerencias_Pred", {
    sugerencia_pred_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo_sugerencia_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
