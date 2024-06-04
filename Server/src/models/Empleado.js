const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Empleado", {
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
      unique: true,
      validate: {
        isNumeric: {
          args: true,
          msg: 'El campo "cedula" debe contener solo números',
        },
        isInt: {
          args: true,
          msg: 'El campo "cedula" debe ser un número entero',
        },
      },
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
      validate: {
        isDate: {
          args: true,
          msg: 'El campo "fecha_nacimiento" debe ser una fecha válida',
        },
      },
    },
    genero: {
      type: DataTypes.ENUM("Masculino", "Femenino"),
      allowNull: false,
    },
    etnia: {
      type: DataTypes.ENUM(
        "Ninguno",
        "Piaroas",
        "Waraos",
        "Yukpas",
        "Yanomamis",
        "Baris",
        "Pemon",
        "Wayuus",
        "Makiritares",
        "Panares",
        "Pumes",
        "Kariñas"
      ),
      defaultValue: "Ninguno",
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'El campo "correo" no es una dirección de correo válida',
        },
      },
    },
    direccion: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    cantidad_hijos: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: 'El campo "cantidad_hijos" debe contener solo números',
        },
        isInt: {
          args: true,
          msg: 'El campo "cantidad_hijos" debe ser un número entero',
        },
      },
    },
    foto_perfil_nombre: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    foto_perfil_ruta: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
