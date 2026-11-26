/**
 * Script de Verificación: Ciclos vs. Métodos de Arreglo
 * Ejecuta este archivo con: node src/verificar.js
 */
const { ventas } = require("./datos");
const {
  valorVenta,
  totalVendido,
  totalUnidades,
  ventasDeCiudad,
  ventasValidas,
  resumenVentas,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
} = require("./analitica");

function verificarPar(nombre, valorCiclo, valorMetodo) {
  const estado = valorCiclo === valorMetodo ? "OK" : "DIFERENTE";
  console.log(`${nombre}: Ciclo = ${valorCiclo} | Método = ${valorMetodo} -> ${estado}`);
}

console.log("=== VERIFICACIÓN CICLO VS MÉTODOS ===");
const totalPorMetodos = resumenVentas(ventas).reduce((acc, v) => acc + v.total, 0);
const unidadesPorMetodos = ventasValidas(ventas).reduce((acc, v) => acc + v.cantidad, 0);

const medellinPorCiclo = ventasDeCiudad(ventas, "Medellín").reduce(
  (acc, v) => acc + valorVenta(v),
  0
);
const medellinPorMetodos = totalPorCiudad(ventas)["medellín"] || 0;

const bogotaPorCiclo = ventasDeCiudad(ventas, "Bogotá").reduce(
  (acc, v) => acc + valorVenta(v),
  0
);
const bogotaPorMetodos = totalPorCiudad(ventas)["bogotá"] || 0;

verificarPar("Total Vendido", totalVendido(ventas), totalPorMetodos);
verificarPar("Unidades Vendidas", totalUnidades(ventas), unidadesPorMetodos);
verificarPar("Ventas Medellín", medellinPorCiclo, medellinPorMetodos);
verificarPar("Ventas Bogotá", bogotaPorCiclo, bogotaPorMetodos);

console.log("\n=== AGRUPACIONES Y RANKING ===");
console.log("Total por ciudad:", totalPorCiudad(ventas));
console.log("Unidades por producto:", unidadesPorProducto(ventas));
console.log("Top 3 productos por valor:", topProductosPorValor(ventas, 3));