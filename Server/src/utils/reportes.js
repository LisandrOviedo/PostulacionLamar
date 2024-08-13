const path = require("path");
const fs = require("fs");

const reporteFichaIngreso = (content) => {
  const logoPath = path.join(__dirname, `../../public/LogoAzul.png`);

  const logo = fs.readFileSync(logoPath).toString("base64");

  return `
<!DOCTYPE html>
<html lang="en" style="font-family: sans-serif;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ficha Ingreso</title>
  </head>
  <body>
    <div style="display: flex; flex-direction: column;">
      <img src="data:image/png;base64,${logo}" alt="Logo LAMAR" width="100px" />
      <div style="display: flex; justify-content: center">
        <h3>FICHA INGRESO</h3>
      </div>
      ${content
        .map(
          (seccion) => `
      <div style="display: flex; flex-direction: column">
        <span><b><u>${seccion.titulo}</u></b></span>
        <br>
        ${seccion.contenido
          .map(
            (contenido) => `
<span><b>${contenido.titulo_campo}</b>${
              contenido.descripcion_campo || ""
            }</span>

          `
          )
          .join("")}
      </div>
      <br><br>
      `
        )
        .join("")}
    </div>
  </body>
</html>
`;
};

module.exports = {
  reporteFichaIngreso,
};
