const fs = require("fs");
const path = require("path");

// Cargar datos desde JSON
const masculino = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "data", "creditoMasculino.json"),
    "utf-8"
  )
);
const femenino = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "creditoFemenino.json"), "utf-8")
);
const ejemplos = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "ejemplo.json"), "utf-8")
);

/**
 * Calcula el monto mínimo, máximo y una recomendación de línea basada en el tipo de nómina,
 * la fecha del primer empleo y el género.
 *
 * @param {string} tipoNomina - El tipo de nómina.
 * @param {string} fechaPrimerEmpleo - La fecha del primer empleo en formato ISO (YYYY-MM-DD).
 * @param {string} genero - El género de la persona ("m" para masculino, "f" para femenino).
 * @returns {Object} Un objeto con los siguientes campos:
 *   - {string} tipoNomina: El tipo de nómina.
 *   - {string} fechaPrimerEmpleo: La fecha del primer empleo.
 *   - {string} genero: El género de la persona.
 *   - {number} montoMinimo: El monto mínimo calculado.
 *   - {number} montoMaximo: El monto máximo calculado.
 *   - {number} recomendacionLinea: La recomendación de línea calculada, redondeada a dos decimales.
 */
function calculoMotor(tipoNomina, fechaPrimerEmpleo, genero) {
  const tablas = genero === "m" ? masculino : femenino;
  const mesesDesdePrimerEmpleo = Math.floor(
    (Date.now() - new Date(fechaPrimerEmpleo).getTime()) /
      (1000 * 60 * 60 * 24 * 30.44)
  );

  const montoMinimoTabla = tablas.montoMinimo[tipoNomina];
  const montoMaximoTabla = tablas.montoMaximo[tipoNomina];

  const montoMinimo = montoMinimoTabla.find(
    ([inicio, fin]) =>
      mesesDesdePrimerEmpleo >= inicio &&
      mesesDesdePrimerEmpleo <= (fin === "Infinity" ? Infinity : fin)
  )[2];
  const montoMaximo = montoMaximoTabla.find(
    ([inicio, fin]) =>
      mesesDesdePrimerEmpleo >= inicio &&
      mesesDesdePrimerEmpleo <= (fin === "Infinity" ? Infinity : fin)
  )[2];

  const p1 = montoMinimo + Math.sqrt(montoMaximo - montoMinimo);
  const p2 = montoMinimo + 0.0175 * (montoMaximo - montoMinimo);
  const recomendacionLinea = Math.max(p1, p2);

  return {
    tipoNomina,
    fechaPrimerEmpleo,
    genero,
    montoMinimo,
    montoMaximo,
    recomendacionLinea: Math.round(recomendacionLinea * 100) / 100,
  };
}

// Procesar ejemplos y guardar resultados en array
const resultados = ejemplos.map(({ tipoNomina, fechaPrimerEmpleo, genero }) =>
  calculoMotor(tipoNomina, fechaPrimerEmpleo, genero)
);

// Imprimir el array de resultados en consola
console.log(resultados);

// Formatear resultados como tabla
let tabla =
  "Tipo Nómina | Fecha Primer Empleo | Género | Mínimo | Máximo | Línea Óptima\n";
tabla +=
  "--------------------------------------------------------------------------\n";
resultados.forEach(
  ({
    tipoNomina,
    fechaPrimerEmpleo,
    genero,
    montoMinimo,
    montoMaximo,
    recomendacionLinea,
  }) => {
    tabla += `${tipoNomina.padEnd(11)} | ${fechaPrimerEmpleo.padEnd(
      19
    )} | ${genero.padEnd(6)} | ${montoMinimo
      .toString()
      .padEnd(6)} | ${montoMaximo
      .toString()
      .padEnd(6)} | ${recomendacionLinea.toFixed(2)}\n`;
  }
);

// Escribir la tabla en resultados.txt
const resultadosPath = path.join(__dirname, "resultados.txt");
fs.writeFileSync(resultadosPath, tabla, "utf-8");

console.log("Resultados generados en resultados.txt");
