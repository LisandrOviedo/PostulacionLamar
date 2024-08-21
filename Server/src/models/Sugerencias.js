const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Sugerencias", {
    sugerencia_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sede_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sugerencia_pred_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    revisado_por_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_revision: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
