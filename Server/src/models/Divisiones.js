const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Divisiones", {
    division_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
