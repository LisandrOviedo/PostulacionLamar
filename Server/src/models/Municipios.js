const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Municipios", {
    municipio_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ciudad_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
