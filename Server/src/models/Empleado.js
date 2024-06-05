const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Empleado",
    {
      empleado_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      rol_id: {
        // Campo relacionado
        type: DataTypes.UUID,
        allowNull: false,
      },
      cedula: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      clave: {
        type: DataTypes.STRING,
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
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      genero: {
        type: DataTypes.ENUM("Masculino", "Femenino"),
        allowNull: false,
      },
      etnia_id: {
        // Campo relacionado
        type: DataTypes.UUID,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      direccion: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      cantidad_hijos: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
      },
      foto_perfil_nombre: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      foto_perfil_ruta: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          name: "cedula",
          fields: ["cedula"],
        },
        {
          unique: true,
          name: "correo",
          fields: ["correo"],
        },
        {
          unique: true,
          name: "foto_perfil_ruta",
          fields: ["foto_perfil_ruta"],
        },
      ],
    }
  );
};
