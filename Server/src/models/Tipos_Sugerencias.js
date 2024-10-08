const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Tipos_Sugerencias", {
    tipo_sugerencia_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
