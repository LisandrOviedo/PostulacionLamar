import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Titulos_Obtenidos", {
    titulo_obtenido_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grado_instruccion: {
      type: DataTypes.ENUM(
        "Primaria",
        "Secundaria",
        "Técnica",
        "Universitaria",
        "Postgrado"
      ),
      allowNull: false,
    },
    fecha_desde: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_hasta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    nombre_instituto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titulo_obtenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
