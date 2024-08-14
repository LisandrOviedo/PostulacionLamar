const path = require("path");
const fs = require("fs");

const crearTabla = (valores, propiedades, encabezados) => {
  return `${
    !valores.length
      ? `:</b> No posee</span>`
      : `</b></span><br>
  <table>
  <thead>
  <tr style="background-color: #dddddd;">
  ${encabezados.map((encabezado) => `<th>${encabezado}</th>`).join("")}
  </tr>
  </thead>
  <tbody>
  
${valores
  .map(
    (valor) =>
      `<tr>
    ${propiedades.map((prop) => `<td>${valor[prop]}</td>`).join("")}
    </tr>`
  )
  .join("")}
  
  </tbody>
  </table>`
  }
  `;
};

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

    <style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

h3{
margin: 0;
padding: 0;
}
</style>
  </head>

  <body>
    <div style="display: flex; flex-direction: column;">
      <img src="data:image/png;base64,${logo}" alt="Logo LAMAR" width="100px" />
      <div style="display: flex; justify-content: center">
        <h3>FICHA INGRESO</h3>
      </div>
      ${content
        .map(
          (seccion) => `<br><br>
      <div style="display: flex; flex-direction: column">
        <span><b><u>${seccion.titulo}</u></b></span>
        <br>
        ${seccion.contenido
          .map(
            (contenido) => `
<span>${contenido.titulo_campo}${
              contenido.titulo_campo === "Títulos Obtenidos"
                ? crearTabla(
                    contenido.descripcion_campo,
                    [
                      "grado_instruccion",
                      "fecha_desde",
                      "fecha_hasta",
                      "nombre_instituto",
                      "titulo_obtenido",
                    ],
                    [
                      "Grado Instrucción",
                      "Fecha Desde",
                      "Fecha Hasta",
                      "Nombre Instituto",
                      "Título Obtenido",
                    ]
                  )
                : contenido.titulo_campo === "Experiencias"
                ? crearTabla(
                    contenido.descripcion_campo,
                    [
                      "tipo",
                      "cargo_titulo",
                      "fecha_desde",
                      "fecha_hasta",
                      "empresa_centro_educativo",
                    ],
                    [
                      "Tipo",
                      "Cargo Ejercido",
                      "Fecha Desde",
                      "Fecha Hasta",
                      "Empresa",
                    ]
                  )
                : contenido.titulo_campo === "Contactos de Emergencia"
                ? crearTabla(
                    contenido.descripcion_campo,
                    ["nombre_apellido", "parentesco", "telefono", "direccion"],
                    ["Nombre y Apellido", "Parentesco", "Teléfono", "Dirección"]
                  )
                : contenido.titulo_campo === "Referencias Personales"
                ? crearTabla(
                    contenido.descripcion_campo,
                    ["nombre_apellido", "direccion", "telefono", "ocupacion"],
                    ["Nombre y Apellido", "Dirección", "Teléfono", "Ocupación"]
                  )
                : `${contenido.descripcion_campo || ""}</span>`
            }
          `
          )
          .join("")}
          ${
            seccion.titulo === "DATOS BANCARIOS"
              ? `<p style="font-size: 12px;"><em>Certifico que la información aquí consignada es exacta, reconociendo que cualquier inexactitud u omisión en ella ocasionaría la terminación unilateral y justificada del Contrato de Trabajo para cuya celebración se haya tomado como base la información de la presente solicitud.</em></p>`
              : ``
          }
      </div>
      `
        )
        .join("")}
        <br>
        <p style="font-size: 12px;"><b>NOTA IMPORTANTE:</b> En caso de cambios en los datos suministrados favor notificar a la Gerencia de Talento Humano.</p>
    </div>
  </body>

</html>
`;
};

module.exports = {
  reporteFichaIngreso,
};
