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
      type: DataTypes.UUID,
      allowNull: true,
    },
    titulo: {
      // Campo relacionado
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ruta: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    orden: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
