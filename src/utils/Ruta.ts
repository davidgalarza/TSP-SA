import {ciudades, matrizDistanias} from './entrada';

class Ruta {

    ruta: string[]; // Ciuades por las que pasa (regresa al punto de partida)
    costo: number; // Distancia para recorrer esa ruta en KM (por carretera)

    constructor(ruta: string[]){
        this.ruta = ruta;
        this.costo = this.computarCosto();
    }


    /**
     * Genera una solucion aleatoria
     */
    static aleatoria(ciudadParte: string): Ruta {
        // Poner la ciudad pasda como origen y destino
        // Generar aleatoriamente las ciudades intermedios
        let rutaAleatoria: string[] = [
            ciudadParte,
            ...ciudades
                .filter((c) => c != ciudadParte) // quito la ciudad
                .sort(() => Math.random() - 0.5), // reordenar aleatoriuamente la lista (parte cambiante)
            ciudadParte
        ];
        return new Ruta(rutaAleatoria);
    }

    /**
     * Devuelva la distancia total que implica reorrer la ruta
     */
    private computarCosto(): number {
        let distanciaTotal = 0;
        // Recorrae la ruta desede el indice 1 para comparar con el anterior
        for (let i = 1; i < this.ruta.length; i++) {
            const ciudad = this.ruta[i]; // Ciudad actual
            const ciudadAnterior = this.ruta[i - 1]; // Ciudad anterior

            const indiceC = ciudades.indexOf(ciudad); // inidice Ciudad actual
            const indiceCAnterior = ciudades.indexOf(ciudadAnterior); // indice Ciudad anterior

            // Obtener la distancia entre ciudades (con los indices de las cidades)
            let dis = matrizDistanias[indiceC][indiceCAnterior];

            distanciaTotal += dis;
        }
        return distanciaTotal;
    }

    /**
     * Altera el orden de la lista de ciudades intermedias
     */
    alterarRuta(): Ruta {
        let longitudRuta = this.ruta.length;
        let intercambiables = this.ruta.slice(1, longitudRuta-1); // Lista de ciudades intermedias
        let posiciones = Array.from(Array(intercambiables.length).keys()) // [0,1,2,3]
        let pos1 = this.shuffle(posiciones)[0]; // optener la primera posicion aleatoria
        posiciones = posiciones.filter(p => p!= pos1); // Sacar de la lista el indice generado
        let pos2 = this.shuffle(posiciones)[0]; // Optener segundo indice aleatorio
        
        // Intercambiar los elementos de las posiones
        let aux = intercambiables[pos1];
        intercambiables[pos1] = intercambiables[pos2];
        intercambiables[pos2] = aux;


        // Volver a crear el camino
        let caminoMutado = [
            this.ruta[0],
            ...intercambiables,
            this.ruta[longitudRuta-1]
        ];

        return new Ruta(caminoMutado);
    }

    private shuffle(lista){
        return lista.sort(() => Math.random() - 0.5);
    }


    
}

export default Ruta;