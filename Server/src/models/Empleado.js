const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Empleado", {
    empleado_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    cedula: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};