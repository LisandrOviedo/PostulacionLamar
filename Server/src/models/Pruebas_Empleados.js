const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Pruebas_Empleados", {
    prueba_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prueba: {
      type: DataTypes.ENUM("Kostick"),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ruta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
