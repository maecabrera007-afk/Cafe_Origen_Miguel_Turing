const ventas = require('./datos');

console.log("Registros de ventas:", ventas.length);
console.log("Primer registro de venta:", ventas[0]);
console.log("Último registro de venta:", ventas[ventas.length - 1]);
console.log("Productos en la posicion 4 :", ventas[4].producto);
console.table(ventas);