const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cargos_Departamentos", {
    cargo_departamento_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    car_niv_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emp_dep_id: {
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
