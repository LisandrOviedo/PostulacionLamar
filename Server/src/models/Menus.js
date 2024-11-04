const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Menus", {
    menu_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    padre_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ruta: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    orden: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    ruta_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    icono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
