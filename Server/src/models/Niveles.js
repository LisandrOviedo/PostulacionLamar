const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Niveles", {
    nivel_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nivel: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
