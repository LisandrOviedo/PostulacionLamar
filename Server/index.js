require("dotenv").config();

const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT_SERVER || 3001;

const {
  crearRespuestas,
} = require("./src/controllers/respuestas_controllers.js");

conn
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);

      // Registrar respuestas del test kostick en la BD
      crearRespuestas();
    });
  })
  .catch((error) => console.error(error));
