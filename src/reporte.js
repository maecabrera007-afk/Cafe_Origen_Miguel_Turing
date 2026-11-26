/**
 * Reporte Ejecutivo de Consola - Café Origen v0.1
 * Ejecuta este archivo con: node src/reporte.js
 */
const { ventas } = require("./datos");
const {
  valorVenta,
  totalVendido,
  totalUnidades,
  ventaMayorValor,
  ventasDeCiudad,
  promedioPorVenta,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
} = require("./analitica");

function formatearCOP(valor) {
  return `$${valor.toLocaleString("es-CO")}`;
}

console.log("==============================================================");
console.log("         REPORTE DE NEGOCIO - CAFÉ ORIGEN v0.1                ");
console.log("==============================================================\n");

// ----------------------------------------------------------------------------
// 1. RESUMEN GENERAL
// ----------------------------------------------------------------------------
console.log("--- 1. RESUMEN GENERAL ---");
const mayor = ventaMayorValor(ventas);
console.log("Total vendido        :", formatearCOP(totalVendido(ventas)));
console.log("Total unidades       :", `${totalUnidades(ventas).toLocaleString("es-CO")} und.`);
console.log("Ticket promedio      :", formatearCOP(Math.round(promedioPorVenta(ventas))));
console.log("Ventas en Medellín   :", `${ventasDeCiudad(ventas, "Medellín").length} transacciones válidas`);
if (mayor) {
  console.log(
    "Venta mayor valor    :",
    `${mayor.producto} - ${formatearCOP(valorVenta(mayor))} (${mayor.ciudad.trim()})`
  );
}
console.log();

// ----------------------------------------------------------------------------
// 2. VENTAS POR CIUDAD
// ----------------------------------------------------------------------------
console.log("--- 2. VENTAS POR CIUDAD ---");
const porCiudad = totalPorCiudad(ventas);
const tablaCiudades = Object.entries(porCiudad).map(([ciudad, total]) => ({
  Ciudad: ciudad.charAt(0).toUpperCase() + ciudad.slice(1),
  "Total Vendido": formatearCOP(total),
}));
console.table(tablaCiudades);

// ----------------------------------------------------------------------------
// 3. UNIDADES VENDIDAS POR PRODUCTO
// ----------------------------------------------------------------------------
console.log("--- 3. UNIDADES VENDIDAS POR PRODUCTO ---");
const porProducto = unidadesPorProducto(ventas);
const tablaProductos = Object.entries(porProducto).map(([producto, unidades]) => ({
  Producto: producto,
  Unidades: unidades,
}));
console.table(tablaProductos);

// ----------------------------------------------------------------------------
// 4. TOP 3 PRODUCTOS POR VALOR GENERADO
// ----------------------------------------------------------------------------
console.log("--- 4. TOP 3 PRODUCTOS QUE MÁS DINERO GENERARON ---");
const top3 = topProductosPorValor(ventas, 3);
top3.forEach((producto, indice) => {
  console.log(`  #${indice + 1} -> ${producto}`);
});
console.log();

// ----------------------------------------------------------------------------
// 5. CONSULTA DIARIA (DÍA CON VENTAS VS DÍA SIN VENTAS)
// ----------------------------------------------------------------------------
console.log("--- 5. CONSULTA DIARIA (CONTROL DE CASOS BORDE) ---");
const fechaConVentas = "2026-09-01";
const fechaSinVentas = "2099-12-31";

const delDiaActivo = ventasDelDia(ventas, fechaConVentas);
console.log(`Día con actividad (${fechaConVentas}):`);
console.log(`  - Transacciones válidas : ${delDiaActivo.length}`);
console.log(`  - Total vendido         : ${formatearCOP(totalVendido(delDiaActivo))}`);
console.log(`  - Ticket promedio       : ${formatearCOP(Math.round(promedioPorVenta(delDiaActivo)))}`);

const delDiaVacio = ventasDelDia(ventas, fechaSinVentas);
console.log(`\nDía sin actividad (${fechaSinVentas}):`);
console.log(`  - Transacciones válidas : ${delDiaVacio.length}`);
console.log(`  - Total vendido         : ${formatearCOP(totalVendido(delDiaVacio))}`);
console.log(`  - Ticket promedio       : ${formatearCOP(promedioPorVenta(delDiaVacio))} (sin NaN)`);
console.log();

// ----------------------------------------------------------------------------
// 6. VERIFICACIÓN DE INMUTABILIDAD
// ----------------------------------------------------------------------------
console.log("--- 6. VERIFICACIÓN DEL ARREGLO ORIGINAL ---");
console.log("¿Sigue teniendo 12 registros? :", ventas.length === 12);
console.log("¿El primero sigue siendo ID 1?:", ventas[0].id === 1);
console.log("==============================================================");