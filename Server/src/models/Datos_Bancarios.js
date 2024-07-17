const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Datos_Bancarios", {
    dato_bancario_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    empleado_id: {
      // Campo relacionado
      type: DataTypes.UUID,
      allowNull: false,
    },
    posee_cuenta_bancaria: {
      type: DataTypes.ENUM("Si", "No"),
      allowNull: false,
    },
    titular_cuenta: {
      type: DataTypes.ENUM("Propia", "Tercero"),
      allowNull: false,
    },
    entidad_bancaria: {
      type: DataTypes.ENUM(
        "100% Banco",
        "Banco Activo",
        "Banco Bicentenario",
        "Banco Caroní",
        "Banco De La Fuerza Armada Nacional Bolivariana",
        "Banco De Venezuela",
        "Banco Del Tesoro",
        "Banco Exterior",
        "Banco Fondo Común",
        "Banco Nacional De Crédito",
        "Banco Plaza",
        "Banco Sofitasa",
        "Banco Venezolano De Crédito",
        "Bancamiga",
        "Bancaribe",
        "Banesco Banco Universal",
        "Bancrecer",
        "Banplus",
        "BBVA Provincial",
        "DELSUR Banco Universal",
        "Mercantil Banco",
        "Mi Banco"
      ),
      allowNull: false,
    },
    numero_cuenta: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombre_apellido: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tipo_identificacion: {
      type: DataTypes.ENUM("E", "V"),
      allowNull: true,
    },
    numero_identificacion: {
      type: DataTypes.STRING(20),
      allowNull: true,
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
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
