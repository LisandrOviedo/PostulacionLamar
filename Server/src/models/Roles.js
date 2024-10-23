import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Roles", {
    rol_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    acceso_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
