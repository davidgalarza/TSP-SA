// Lista de ciudades por donde pasara el viajero
let ciudades: string[] = ['AMBATO', 'QUITO', 'PUYO', 'GUARANDA', 'RIOBAMBA' ];

// Matiz distania entre ciudades (por carretera)
let matrizDistanias: number[][] = [
    [0,	156, 100, 95, 56],
    [156, 0, 252, 251, 210],
    [100, 252, 0, 294, 134],
    [95, 251, 294, 0, 56],
    [56, 210, 134, 56, 0]
];

// let ciudades: string[] = ['AMBATO', 'QUITO', 'PUYO', 'GUARANDA', 'RIOBAMBA', 'TENA' ];

// let matrizDistanias: number[][] = [
//     [0,156,100,95,56,177],
//     [156,0,252,251,210,194],
//     [100,252,0,294,134,79],
//     [95,251,294,0,56,255],
//     [56,210,134,56,0,212],
//     [177,194,79,255,212,0]
// ];


export {ciudades, matrizDistanias};