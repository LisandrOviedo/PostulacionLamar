const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Revisiones_Fichas_Ingresos", {
    revision_ficha_ingreso_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    numero: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
