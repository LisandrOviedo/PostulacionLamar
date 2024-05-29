require("dotenv").config();

const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT_SERVER || 3001;

const {
  cargarPreguntasKostick,
} = require("./src/controllers/preguntas_kostick_controllers.js");

const {
  cargarAreaInteres,
} = require("./src/controllers/areas_interes_controllers.js");

const { cargarIdiomas } = require("./src/controllers/idiomas_controllers.js");

const { cargarRoles } = require("./src/controllers/roles_controllers.js");

const {
  cargarEmpleados,
} = require("./src/controllers/empleados_controllers.js");

conn
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);

      // Registrar preguntas del test kostick en la BD
      cargarPreguntasKostick();

      // Registrar áreas de interés principales en la BD
      cargarAreaInteres();

      // Registrar idiomas principales en la BD
      cargarIdiomas();

      // Registrar roles principales en la BD
      cargarRoles();

      // Registrar roles principales en la BD
      cargarEmpleados();
    });
  })
  .catch((error) => console.error(error));
