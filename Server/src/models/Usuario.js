const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Usuario", {
    usuario_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    cedula: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
