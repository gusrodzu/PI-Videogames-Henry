const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Se define el modelo "genre" utilizando la función sequelize.define().
  sequelize.define(
    "genre", // Nombre del modelo, que será "genre".
    {
      id: {
        type: DataTypes.UUID, // Tipo de dato para el atributo "id": UUID (identificador único universal).
        defaultValue: DataTypes.UUIDV4, // Valor predeterminado generado automáticamente: UUIDV4.
        allowNull: false, // No se permite que el atributo "id" sea nulo (debe tener un valor).
        primaryKey: true, // Indica que el atributo "id" es la clave primaria de la tabla.
      },
      name: {
        type: DataTypes.STRING, // Tipo de dato para el atributo "name": STRING (cadena de texto).
        allowNull: false, // No se permite que el atributo "name" sea nulo (debe tener un valor).
      },
    },
    { timestamps: false } // Opciones del modelo: se establece timestamps a false para evitar marcas de tiempo automáticas.
  );
};
