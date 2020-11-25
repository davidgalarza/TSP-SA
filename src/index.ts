import Ruta from "./utils/Ruta";
var childProc = require('child_process');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



let temperaturaInicia: number = 100; // Temperatura con la que inicia el sistema
let temperaturaFinal: number = 1; //  Temperatura con la que se detiene el sistema
let cEnfriamiento: number = 0.92; // Decremento de temperatura
let nMovimientos: number = 4; // Cuantos tablros se generan por iteracion




let tempSistema: number = temperaturaInicia; // Iniciar el sistem en la temp inicial
let solucion: Ruta = Ruta.aleatoria('AMBATO'); // Generar una soluion aleatria


let iteracion = 0; // Contador de iteraciones

while(tempSistema > temperaturaFinal) {
    iteracion++;
    console.log(`ITERACION ${iteracion}: temperatura = ${tempSistema.toFixed(2)} | costoSolucion = ${solucion.costo}`);

    // Generar nMovimientos de variones de la solucion actual
    for (let i = 0; i < nMovimientos; i++) {
        let rutaAlterada: Ruta = solucion.alterarRuta(); // Alterar aleatoriamene la solicion actual

        // Verifiar si se acepta la solucion modificada
        if(rutaAlterada.costo < solucion.costo){
            solucion = rutaAlterada; // Se acepta la alteracion como nueva solucion
        } else {
            let r = Math.random();
            // Probabilida de acpetar soluciones peores (atraparse en un minimo local)
            let provBolsman = Math.exp(-(rutaAlterada.costo - solucion.costo) / tempSistema);
            if(r < provBolsman) {
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

rl.question("Abrir en mapa?(S/N) ", function(res) {
    if(res.toUpperCase() == 'S'){
        childProc.exec(`open -a "Google Chrome" https://www.google.com/maps/dir/${solucion.ruta.join('/')}`, ()=>{
            process.exit();
        });
    } else {
        process.exit();
    }
});











