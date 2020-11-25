"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ruta_1 = __importDefault(require("./utils/Ruta"));
var childProc = require('child_process');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let temperaturaInicia = 50; // Temperatura con la que inicia el sistema
let temperaturaFinal = 1; //  Temperatura con la que se detiene el sistema
let cEnfriamiento = 0.92; // Decremento de temperatura
let nMovimientos = 4; // Cuantos tablros se generan por iteracion
let tempSistema = temperaturaInicia; // Iniciar el sistem en la temp inicial
let solucion = Ruta_1.default.aleatoria('AMBATO'); // Generar una soluion aleatria
let iteracion = 0; // Contador de iteraciones
while (tempSistema > temperaturaFinal) {
    iteracion++;
    console.log(`ITERACION ${iteracion}: temperatura = ${tempSistema.toFixed(2)} | costoSolucion = ${solucion.costo}`);
    // Generar nMovimientos de variones de la solucion actual
    for (let i = 0; i < nMovimientos; i++) {
        let rutaAlterada = solucion.alterarRuta(); // Alterar aleatoriamene la solicion actual
        // Verifiar si se acepta la solucion modificada
        if (rutaAlterada.costo < solucion.costo) {
            solucion = rutaAlterada; // Se acepta la alteracion como nueva solucion
        }
        else {
            let r = Math.random();
            // Probabilida de acpetar soluciones peores (atraparse en un minimo local)
            let provBolsman = Math.exp(-(rutaAlterada.costo - solucion.costo) / tempSistema);
            if (r < provBolsman) {
                solucion = rutaAlterada; // Patazo (sacarle del minimo local)
            }
        }
    }
    tempSistema *= cEnfriamiento; // Bajar la temperatura del sistema
}
// Mostrar la solucion
console.log('========= SOLUCIÓN ========');
console.log(solucion.ruta.join(' -> '));
console.log(`COSTO: ${solucion.costo}`);
rl.question("Abrir en mapa?(S/N) ", function (res) {
    if (res.toUpperCase() == 'S') {
        childProc.exec(`open -a "Google Chrome" https://www.google.com/maps/dir/${solucion.ruta.join('/')}`, () => {
            process.exit();
        });
    }
    else {
        process.exit();
    }
});
//# sourceMappingURL=index.js.map