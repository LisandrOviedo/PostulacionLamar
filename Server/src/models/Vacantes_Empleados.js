import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Vacantes_Empleados", {
    vacante_empleado_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vacante_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    empleado_id: {
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
