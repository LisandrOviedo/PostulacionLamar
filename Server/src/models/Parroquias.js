import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Parroquias", {
    parroquia_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    municipio_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
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
