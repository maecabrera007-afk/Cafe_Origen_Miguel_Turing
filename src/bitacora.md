## Diccionario de datos

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


## Caso borde detectado 

Caso 1 : En ciudad la venta de id : 5 tiene el nombre escrito con minuscula " medellin "
Solucion : normalizar al estándar con mayúscula inicial (`"Medellín"`) en la fase de limpieza, sin modificar `datos.js`.

Caso 2 : En la cantidad de el id : 8  tiene la cantidad en valor "0"
Solucion: excluirla de los cálculos de ingresos y unidades, conservarla en los datos
   originales y confirmar su origen con el área de ventas.

Caso 3 : Producto con la presentación dentro del texto:** `"Origen Huila 500 g"` mezcla nombre y
   peso, y no todos los productos tienen presentación (`Prensa francesa`, `Molino manual`).
Solucion: por ahora se trata el texto completo como una categoría. Si se necesita
   analizar por tipo de café o peso, se separarán en propiedades distintas.

