const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Contactos_Emergencia", {
    contacto_emergencia_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    nombre_apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    parentesco: {
      type: DataTypes.ENUM(
        "Abuelo/a",
        "Amigo/a",
        "Cónyuge",
        "Hermano/a",
        "Hijo/a",
        "Madre",
        "Nieto/a",
        "Padre",
        "Primo/a",
        "Sobrino/a",
        "Tío/a"
      ),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};