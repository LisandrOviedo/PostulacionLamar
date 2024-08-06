const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Empresas_Departamentos", {
    empresa_departamento_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empresa_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departamento_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
