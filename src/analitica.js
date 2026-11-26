/**
 * Motor de analítica de Café Origen v0.1 (Plantilla Base)
 *
 * Instrucciones:
 * - Implementa el cuerpo de cada función siguiendo su descripción.
 * - Apóyate en los archivos de la carpeta `patrones/` para ver ejemplos de cada técnica.
 * - Recuerda NO modificar (mutar) el arreglo `ventas` original.
 */

/**
 * Calcula el valor total de una venta individual (cantidad * precio).
 * @param {Object} venta - Objeto que representa una venta.
 * @returns {number} Valor monetario de la venta.
 */
function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

// ============================================================================
// MINIRRETO 2: Indicadores básicos con ciclos manuales (for ... of)
// Requisito: Resolver usando un ciclo `for ... of` (sin .reduce, .filter, .map)
// Guía recomendada: patrones/01-contadores-y-acumuladores.js y 02-extremos-maximo-minimo.js
// ============================================================================

/**
 * Suma el valor total (cantidad * precio) de todas las ventas válidas (cantidad > 0).
 * Patrón sugerido: Acumulador con filtro manual.
 * @param {Array} ventas - Arreglo de objetos de ventas.
 * @returns {number} Dinero total vendido.
 */
function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
    }
  }
  return total;
}

/**
 * Suma todas las unidades vendidas en las órdenes válidas (cantidad > 0).
 * Patrón sugerido: Acumulador.
 * @param {Array} ventas - Arreglo de objetos de ventas.
 * @returns {number} Total de unidades vendidas.
 */
function totalUnidades(ventas) {
  let unidades = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      unidades += venta.cantidad;
    }
  }
  return unidades;
}

/**
 * Devuelve el objeto completo de la venta con mayor valor total (cantidad * precio).
 * Patrón sugerido: Búsqueda de extremo (máximo).
 * @param {Array} ventas - Arreglo de objetos de ventas.
 * @returns {Object|null} El objeto de la venta más alta.
 */
function ventaMayorValor(ventas) {
  let mayor = null;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
        mayor = venta;
      }
    }
  }
  return mayor;
}

/**
 * Devuelve un nuevo arreglo con las ventas válidas de una ciudad específica,
 * sin importar diferencias de mayúsculas/minúsculas (ej. "Medellín" vs "medellín").
 * Patrón sugerido: Filtro manual con normalización de texto (.trim().toLowerCase()).
 * @param {Array} ventas - Arreglo de objetos de ventas.
 * @param {string} ciudad - Nombre de la ciudad a buscar.
 * @returns {Array} Nuevo arreglo con las ventas de esa ciudad.
 */
function ventasDeCiudad(ventas, ciudad) {
  let resultado = [];
  const ciudadBuscada = ciudad.trim().toLowerCase();

  for (const venta of ventas) {
    if (venta.ciudad && venta.cantidad > 0) {
      const ciudadVenta = venta.ciudad.trim().toLowerCase();

      if (ciudadVenta === ciudadBuscada) {
        resultado.push(venta);
      }
    }
  }
  return resultado;
}

/**
 * Calcula el promedio de dinero por venta, dividiendo el total vendido
 * únicamente entre la cantidad de ventas válidas (cantidad > 0).
 * Patrón sugerido: Acumulador + Contador combinados.
 * @param {Array} ventas - Arreglo de objetos de ventas.
 * @returns {number} Promedio por venta válida.
 */
function promedioPorVenta(ventas) {
  let totalDinero = 0;
  let ventasValidas = 0;

  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      totalDinero += valorVenta(venta);
      ventasValidas++;
    }
  }

  if (ventasValidas === 0) {
    return 0;
  }

  return totalDinero / ventasValidas;
}

// ============================================================================
// MINIRRETO 3: Métodos de arreglo (.filter, .map, .reduce, .sort) y Top K
// Requisito: Resolver usando métodos de arreglos sin mutar el arreglo original.
// Guía recomendada: patrones/03-filter-map-reduce.js, 04-objetos-como-diccionarios