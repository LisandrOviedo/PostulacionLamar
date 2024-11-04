const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Empresas", {
    empresa_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo_empresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rif: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    // seguro_social_id: {
    //   // Campo relacionado
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
