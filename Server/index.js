import "dotenv/config";

import server from "./src/server.js";
import { conn } from "./src/db.js";
const PORT = process.env.PORT_SERVER || 4055;

import { fechaHoraActual } from "./src/utils/formatearFecha.js";

import { cargarPreguntasKostick } from "./src/controllers/preguntas_kostick_controllers.js";

import { cargarAreaInteres } from "./src/controllers/areas_interes_controllers.js";

import { cargarIdiomas } from "./src/controllers/idiomas_controllers.js";

import { cargarRoles } from "./src/controllers/roles_controllers.js";

import { cargarEmpleados } from "./src/controllers/empleados_controllers.js";

import { cerrarSesiones } from "./src/controllers/sesiones_controllers.js";

import { cargarEtnias } from "./src/controllers/etnias_controllers.js";

import { cargarPaises } from "./src/controllers/paises_controllers.js";

import { cargarEstados } from "./src/controllers/estados_controllers.js";

import { cargarMunicipios } from "./src/controllers/municipios_controllers.js";

import { cargarParroquias } from "./src/controllers/parroquias_controllers.js";

import { cargarEmpresas } from "./src/controllers/empresas_controllers.js";

import { cargarClasesMovimientos } from "./src/controllers/clases_movimientos_controllers.js";

conn
  .sync()
  .then(() => {
    server.listen(PORT, async () => {
      console.log(`${fechaHoraActual()} - Server listening on port ${PORT}`);

      // Cerrar sesiones en la BD
      // await cerrarSesiones();

      // Registrar preguntas del test kostick en la BD
      // await cargarPreguntasKostick();

      // Registrar áreas de interés principales en la BD
      // await cargarAreaInteres();

      // Registrar idiomas principales en la BD
      // await cargarIdiomas();

      // Registrar roles principales en la BD
      // await cargarRoles();

      // Registrar etnias principales en la BD
      // await cargarEtnias();

      // Registrar países principales en la BD
      // await cargarPaises();

      // Registrar estados principales en la BD
      // await cargarEstados();

      // Registrar municipios principales en la BD
      // await cargarMunicipios();

      // Registrar parroquias principales en la BD
      // await cargarParroquias();

      // Registrar clases de movimientos principales en la BD
      // await cargarClasesMovimientos();

      // Registrar empresas principales en la BD
      // await cargarEmpresas();

      // Registrar empleados en la BD
      // await cargarEmpleados();
    });
  })
  .catch((error) => console.error(error));
