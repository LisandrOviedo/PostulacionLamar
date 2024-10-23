import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Clases_Movimientos", {
    clase_movimiento_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
