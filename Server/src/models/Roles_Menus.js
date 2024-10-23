import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Roles_Menus", {
    rol_menu_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rol_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menu_id: {
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
