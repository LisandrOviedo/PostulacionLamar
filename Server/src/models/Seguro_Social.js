const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Seguro_Social", {
    seguro_social_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rif: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
