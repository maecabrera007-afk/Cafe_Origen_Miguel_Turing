# Bitácora de Análisis - Café Origen v0.1

## 1. Diccionario de datos (Minirreto 1)

| Propiedad | Tipo de dato | Significado |
| :--- | :--- | :--- |
| `id` | `number` | Identificador numérico único y secuencial de cada registro de venta (del 1 al 12). |
| `fecha` | `string` | Fecha en la que se realizó la venta, expresada en formato ISO (`AAAA-MM-DD`). |
| `cliente` | `string` | Código alfanumérico único que identifica al cliente comprador (ej. `"C01"`, `"C02"`). |
| `producto` | `string` | Nombre descriptivo del artículo vendido, incluyendo su presentación o gramaje cuando aplica. |
| `ciudad` | `string` | Nombre de la ciudad donde se registró la venta (nota: presenta inconsistencia de mayúsculas/minúsculas en `"medellín"`). |
| `cantidad` | `number` | Número de unidades vendidas del producto en la transacción (nota: incluye un caso atípico con valor `0` en el registro 8). |
| `precio` | `number` | Valor unitario del producto expresado en pesos colombianos (COP), sin puntos ni símbolos de moneda. |

---

## 2. Casos borde detectados en los datos (Minirreto 1)

### Hallazgo 1:
- **Descripción**: En ciudad, la venta de `id: 5` tiene el nombre escrito en minúscula (`"medellín"`).
- **¿Cómo se debe tratar en el análisis?**: Normalizar al estándar con `.trim().toLowerCase()` en las comparaciones y agrupaciones, sin modificar `datos.js`.

### Hallazgo 2:
- **Descripción**: En la cantidad del `id: 8` el valor es `0`.
- **¿Cómo se debe tratar en el análisis?**: Excluirla de los cálculos de ingresos, unidades y promedios (`cantidad > 0`), conservarla en los datos originales y confirmar su origen con el área de ventas.

### Hallazgo 3:
- **Descripción**: Producto con la presentación dentro del texto: `"Origen Huila 500 g"` mezcla nombre y peso, y no todos los productos tienen presentación (`Prensa francesa`, `Molino manual`).
- **¿Cómo se debe tratar en el análisis?**: Por ahora se trata el texto completo como una categoría. Si se necesita analizar por tipo de café o peso, se separarán en propiedades distintas.

---

## 3. Patrones con ciclos manuales (Minirreto 2)

- **`totalVendido(ventas)`**:
  - *Patrón usado (contador, acumulador, filtro, extremo)*: Acumulador (con filtro de ventas válidas).
  - *Explicación*: Recorremos cada objeto del arreglo `ventas` con `for...of` (desde el primer elemento hasta el último), verificamos que la venta sea válida (`cantidad > 0`), calculamos su monto llamando a `valorVenta(venta)` y lo vamos sumando en una variable acumuladora iniciada en `0` hasta terminar todo el arreglo.

- **`totalUnidades(ventas)`**:
  - *Patrón usado*: Acumulador (con filtro de ventas válidas).
  - *Explicación*: Se inicia una variable acumuladora en `0`, se recorre el arreglo `ventas` con `for...of` y, por cada venta válida (`cantidad > 0`), se suma `venta.cantidad` al acumulado total.

- **`ventaMayorValor(ventas)`**:
  - *Patrón usado*: Extremo / Máximo (con filtro de ventas válidas).
  - *Explicación*: Se inicia una variable `mayor` en `null`. Al recorrer cada venta válida con `for...of`, se compara `valorVenta(venta)` contra `valorVenta(mayor)` guardado hasta ese momento; si es mayor, se guarda el objeto completo de esa venta.

- **`ventasDeCiudad(ventas, ciudad)`**:
  - *Patrón usado*: Filtro manual con normalización de texto (`.trim().toLowerCase()`).
  - *Explicación*: Se crea un arreglo vacío (`resultado = []`) y se normaliza el parámetro `ciudad` quitando espacios y pasando a minúsculas. Luego se recorre `ventas` con `for...of`, y cada venta válida cuya ciudad normalizada coincida exactamente (`===`) con la ciudad buscada se agrega al nuevo arreglo con `.push(venta)`.

- **`promedioPorVenta(ventas)`**:
  - *Patrón usado*: Acumulador + Contador combinados (con filtro de ventas válidas).
  - *Explicación*: Se inician dos variables en `0` (`totalDinero` como acumulador y `ventasValidas` como contador). Al recorrer `ventas` con `for...of`, por cada venta válida (`cantidad > 0`) se suma `valorVenta(venta)` al acumulador y se suma `1` al contador. Al finalizar el ciclo, se divide el total acumulado entre el contador (retornando `0` si el contador quedó en `0` para evitar `NaN`).

---

## 4. Del ciclo al método: Preguntas de transformación y agrupación (Minirreto 3)

- **¿Qué filtro? (`.filter`)**: Los registros válidos del arreglo `ventas`, descartando aquellos donde `venta.cantidad <= 0` o donde falten propiedades clave como `ciudad` o `producto` (y en el caso de búsqueda por ciudad, conservando solo los que coinciden tras normalizar con `.trim().toLowerCase()`).
- **¿Qué transformo? (`.map`)**:
  - En `resumenVentas`: cada objeto de venta válido en un nuevo objeto resumido `{ id, producto, ciudad, total }` con la ciudad en minúsculas y el total calculado.
  - En `topProductosPorValor`: los pares `[producto, total]` (ya ordenados y recortados a los primeros `k`) para extraer únicamente el nombre del producto (`entrada[0]`) y devolver un arreglo de strings.
- **¿Qué reduzco / acumulo? (`.reduce`)**:
  - En agrupaciones (`totalPorCiudad`, `unidadesPorProducto`, `topProductosPorValor`): el dinero o las unidades acumuladas por cada clave dentro de un objeto partiendo de `{}`.
- **¿Cómo agrupo en un diccionario?**: Usando `.reduce()` con un objeto vacío `{}` como valor inicial. En cada iteración se normaliza la clave (ciudad o producto) y se actualiza su valor con `diccionario[clave] = (diccionario[clave] || 0) + valorASumar`, evitando grupos duplicados por espacios o mayúsculas.
- **¿Cómo ordeno sin modificar el arreglo original? (`.sort`)**: Trabajando sobre un arreglo nuevo independiente de `ventas`: al convertir el diccionario con `Object.entries()` se crea una nueva referencia en memoria antes de ejecutar `.sort((a, b) => b[1] - a[1])`, dejando intacto el orden del arreglo `ventas` original.

---

## 5. Verificación del reporte y depuración sistemática (Minirreto 4)

### Caso 1: Duplicación de ciudad (`"Bogotá"` aparece dos veces)

- **Síntoma**: Al generar el resumen de ventas por ciudad, una misma ciudad aparecía dividida en dos grupos distintos en lugar de consolidar el total en uno solo.
- **Entrada que lo produce**: Registros con diferencias de espacios en blanco o mayúsculas/minúsculas en el campo `ciudad`, por ejemplo: `{ ciudad: "Bogotá", ... }` frente a `{ ciudad: "Bogotá ", ... }`, o `{ ciudad: "Medellín", ... }` frente a `{ ciudad: "medellín", ... }`.
- **Hipótesis**: La función de agrupación estaba usando `venta.ciudad` directamente como clave del objeto diccionario sin limpiar espacios laterales ni estandarizar mayúsculas/minúsculas, haciendo que JavaScript interpretara `"Bogotá"` y `"Bogotá "` como propiedades diferentes.
- **Prueba realizada**: Se inspeccionaron las claves generadas por `Object.keys(totalPorCiudad(ventas))` y se ejecutó el reporte verificando que todas las variantes de texto sumaran en el mismo acumulador.
- **Causa**: Ausencia de normalización de cadenas de texto antes de indexar el diccionario de agrupación.
- **Corrección**: Se aplicó `.trim().toLowerCase()` sobre `venta.ciudad` antes de asignar la clave en `totalPorCiudad(ventas)` (`const ciudadNorm = venta.ciudad.trim().toLowerCase()`). Con esto, todas las variantes convergen en una única clave y el reporte muestra exactamente las cuatro ciudades esperadas sin duplicados.

### Caso 2: Resultado `NaN` en el promedio al filtrar un día sin ventas

- **Síntoma**: Al consultar el ticket promedio de una fecha sin registros válidos, la consola imprimía `$NaN` en lugar de `$0`.
- **Entrada que lo produce**: Invocar `promedioPorVenta(ventasDelDia(ventas, "2099-12-31"))`, lo cual pasa un arreglo vacío `[]` (o un arreglo donde ningún registro cumple `cantidad > 0`) a la función de promedio.
- **Hipótesis**: Al recibir un arreglo sin ventas válidas, tanto el acumulador de dinero (`totalDinero`) como el contador de ventas (`ventasValidas`) permanecían en `0`, ejecutando al final la operación matemática `0 / 0`, cuyo resultado en JavaScript es `NaN`.
- **Prueba realizada**: Se ejecutó `console.log(promedioPorVenta([]))` y se integró en `src/reporte.js` una consulta explícita a una fecha sin ventas (`"2099-12-31"`).
- **Causa**: Falta de guarda o validación de caso borde antes de realizar la división entre el total acumulado y el contador de ventas válidas.
- **Corrección**: Se incorporó una condición de salida temprana antes de dividir (`if (ventasValidas === 0) return 0;`), garantizando que ante un arreglo vacío o un día sin ventas el motor retorne `0` de forma segura y limpia.