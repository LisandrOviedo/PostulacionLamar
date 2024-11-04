const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.disable("x-powered-by");

server.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:5173",
        "http://10.10.0.46/tthh/",
      ];

      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

server.use(morgan("dev"));
server.use(express.json({ limit: "65mb" })); //Límite máximo en el tamaño de los datos JSON que el servidor puede manejar de una sola vez, para evitar posibles ataques de denegación de servicio (DoS) o abusos.

const path = require("path");

server.use(
  express.static(path.join(__dirname, `../public/documentosEmpleados/`))
);

server.use(router);

module.exports = server;
