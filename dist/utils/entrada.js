"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matrizDistanias = exports.ciudades = void 0;
// Lista de ciudades por donde pasara el viajero
let ciudades = ['AMBATO', 'QUITO', 'PUYO', 'GUARANDA', 'RIOBAMBA'];
exports.ciudades = ciudades;
// Matiz distania entre ciudades (por carretera)
let matrizDistanias = [
    [0, 156, 100, 95, 56],
    [156, 0, 252, 251, 210],
    [100, 252, 0, 294, 134],
    [95, 251, 294, 0, 56],
    [56, 210, 134, 56, 0]
];
exports.matrizDistanias = matrizDistanias;
//# sourceMappingURL=entrada.js.map