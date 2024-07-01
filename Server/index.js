require("dotenv").config();

const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT_SERVER || 4055;

const { fechaHoraActual } = require("./src/utils/formatearFecha.js");

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

const { cerrarSesiones } = require("./src/controllers/sesiones_controllers.js");

const { cargarEtnias } = require("./src/controllers/etnias_controllers.js");

conn
  .sync()
  .then(() => {
    server.listen(PORT, async () => {
      console.log(`${fechaHoraActual()} - Server listening on port ${PORT}`);

      // Cerrar sesiones en la BD
      await cerrarSesiones();

      // Registrar preguntas del test kostick en la BD
      await cargarPreguntasKostick();

      // Registrar áreas de interés principales en la BD
      await cargarAreaInteres();

      // Registrar idiomas principales en la BD
      await cargarIdiomas();

      // Registrar roles principales en la BD
      await cargarRoles();

      // Registrar etnias principales en la BD
      await cargarEtnias();

      // Registrar empleados en la BD
      await cargarEmpleados();
    });
  })
  .catch((error) => console.error(error));
