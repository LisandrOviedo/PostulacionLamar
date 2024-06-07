const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const { Sesiones } = require("../db");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const validarTokenBD = await Sesiones.findOne({
    where: { token: token, activo: true },
  });

  if (!validarTokenBD) {
    return res.sendStatus(403);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
