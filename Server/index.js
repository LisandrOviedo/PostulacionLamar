require("dotenv").config();

const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT_SERVER || 3001;

const {
  crearPreguntasKostick,
} = require("./src/controllers/preguntas_kostick_controllers.js");

conn
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);

      // Registrar preguntas del test kostick en la BD
      crearPreguntasKostick();
    });
  })
  .catch((error) => console.error(error));
