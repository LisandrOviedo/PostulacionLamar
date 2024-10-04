const path = require("path");
const fs = require("fs");

const { DDMMYYYYHHMM2 } = require("./formatearFecha");

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

const reporteFichaIngreso = (content, foto_empleado) => {
  const logoPath = path.join(__dirname, `../../public/LogoAzul.png`);

  const logo = fs.readFileSync(logoPath).toString("base64");

  let fotoEmpleado;

  if (foto_empleado.foto_perfil_ruta) {
    fotoEmpleado = fs
      .readFileSync(foto_empleado.foto_perfil_ruta)
      .toString("base64");
  }

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

.linea{
height: 1px;
background: black;
}

.pulgares{
height: 100px;
width: 80px;
border: 1px solid #000;
}

.foto{
height: 100px;
width: 100px;
border: 1px solid #000;
}
</style>
  </head>

  <body>
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
    <img src="data:image/png;base64,${logo}" alt="Logo LAMAR" width="100px" />
    <div style="display: flex; flex-direction: column; align-items: center; font-size: 12px;">
    <span>GRL-TH-F-001</span>
    <span>F. Rev.: 17-05-2024</span>
    <span>Revisión No.: 1</span>
    <span>${DDMMYYYYHHMM2()}</span>
    </div>
      </div>
      <div style="display: flex; justify-content: center">
        <h3>FICHA DE INGRESO</h3>
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
<span>${contenido.titulo_campo || ""}${
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
    <br><br><br>
    <div style="display: flex; justify-content: space-evenly; align-items: end; text-align: center;">
    <div style="display: flex; flex-direction: column; width: 150px; gap: 5px;">
    <span>${content[0].contenido[0].descripcion_campo}</span>
    <div class="linea"></div>
    <span style="font-size: 12px;">Nombre Completo</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 5px;">
    <span>${content[0].contenido[1].descripcion_campo}</span>
    <div class="linea"></div>
    <span style="font-size: 12px;">Número de identificación</span>
    </div>
    <div style="display: flex; flex-direction: column; width: 100px; gap: 5px;">
    <div class="linea"></div>
    <span style="font-size: 12px;">Fecha</span>
    </div>
    <div style="display: flex; flex-direction: column; width: 150px; gap: 5px;">
    <div class="linea"></div>
    <span style="font-size: 12px;">Firma</span>
    </div>
    </div>
    <br><br><br>
    <div style="display: flex; justify-content: space-evenly; text-align: center;">
    <div style="display: flex; flex-direction: column; gap: 5px; align-items: center;">
    ${
      foto_empleado.foto_perfil_ruta
        ? `<img style="width: 100px; height: 100px; object-fit: cover;" src="data:image/png;base64,${fotoEmpleado}" alt="Foto Empleado" />`
        : `<div class="foto"></div>`
    }
    <span style="font-size: 12px;">Foto reciente</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 5px; align-items: center;">
    <div class="pulgares"></div>
    <span style="font-size: 12px;">Pulgar izquierdo</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 5px; align-items: center;">
    <div class="pulgares"></div>
    <span style="font-size: 12px;">Pulgar derecho</span>
    </div>
    </div>
    
    </div>
  </body>

</html>
`;
};

const reporteMovimiento = (content) => {
  const logoPath = path.join(__dirname, `../../public/LogoAzul.png`);

  const logo = fs.readFileSync(logoPath).toString("base64");

  return `
<!DOCTYPE html>
<html lang="en" style="font-family: sans-serif;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Movimiento</title>

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

.linea{
height: 1px;
background: black;
}

.pulgares{
height: 100px;
width: 80px;
border: 1px solid #000;
}

.foto{
height: 100px;
width: 100px;
border: 1px solid #000;
}
</style>
  </head>

  <body>
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
    <img src="data:image/png;base64,${logo}" alt="Logo LAMAR" width="100px" />
    <div style="display: flex; flex-direction: column; align-items: center; font-size: 12px;">
    <span>GRL-TH-F-012</span>
    <span>F. Rev.: 17-05-2024</span>
    <span>Revisión No.: 0</span>
    <span>${DDMMYYYYHHMM2()}</span>
    </div>
      </div>
      <div style="display: flex; justify-content: center">
        <h3>MOVIMIENTO</h3>
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
<span>${contenido.titulo_campo || ""} ${
              contenido.descripcion_campo || ""
            }</span>`
          )
          .join("")}
      </div>
      `
        )
        .join("")}
  </body>
</html>
`;
};

module.exports = {
  reporteFichaIngreso,
  reporteMovimiento,
};
