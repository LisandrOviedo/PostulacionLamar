const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Parroquia", {
    parroquia_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    municipio_id: {
      // Campo relacionado
      type: DataTypes.UUID,
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
