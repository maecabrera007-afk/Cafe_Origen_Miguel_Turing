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
Usa el código con precaución.


---

## 2. Casos borde detectados en los datos (Minirreto 1)

### Hallazgo 1:
- **Descripción**:En ciudad la venta de id : 5 tiene el nombre escrito con minuscula " medellin "
- **¿Cómo se debe tratar en el análisis?**:normalizar al estándar con mayúscula inicial (`"Medellín"`) en la fase de limpieza, sin modificar `datos.js`.


### Hallazgo 2:
- **Descripción**: En la cantidad de el id : 8  tiene la cantidad en valor "0"
- **¿Cómo se debe tratar en el análisis?**:excluirla de los cálculos de ingresos y unidades, conservarla en los datos
   originales y confirmar su origen con el área de ventas.


### Hallazgo 3:
- **Descripcion**:Producto con la presentación dentro del texto:** `"Origen Huila 500 g"` mezcla nombre y
   peso, y no todos los productos tienen presentación (`Prensa francesa`, `Molino manual`).
- **¿Cómo se debe tratar en el análisis?**:por ahora se trata el texto completo como una categoría. Si se necesita
   analizar por tipo de café o peso, se separarán en propiedades distintas.


---

## 3. Patrones con ciclos manuales (Minirreto 2)

- **`totalVendido(ventas)`**:
  - *Patrón usado (contador, acumulador, filtro, extremo)*: Hacemos un iterador entre todos los idices del arreglo de ventas que se definio en valor venta  y despues va cogiendo ese valor y lo va sumando hasta llegar al id 12 o al indice 11


- **`totalUnidades(ventas)`**:
  - *Patrón usado*: Se hace el acumulador 
- **`ventaMayorValor(ventas)`**:
  - *Patrón usado*:
- **`ventasDeCiudad(ventas, ciudad)`**:
  - *Patrón usado*:
- **`promedioPorVenta(ventas)`**:
  - *Patrón usado*:

---

## 4. Del ciclo al método: Preguntas de transformación y agrupación (Minirreto 3)

- **¿Qué filtro? (`.filter`)**:
- **¿Qué transformo? (`.map`)**:
- **¿Qué reduzco / acumulo? (`.reduce`)**:
- **¿Cómo agrupo en un diccionario?**:
- **¿Cómo ordeno sin modificar el arreglo original? (`.sort`)**:

---

## 5. Verificación del reporte y pureza de funciones (Minirreto 4)

- **¿Cómo comprobaste que el arreglo `ventas` original no fue modificado?**:
- **Comando para ejecutar el reporte**:
