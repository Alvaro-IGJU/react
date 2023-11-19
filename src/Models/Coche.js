import {Vehiculo} from "./Vehiculo";
export class Coche extends Vehiculo {
    constructor(modelo, traccion, velocidadMinima, velocidadMaxima) {
        super(modelo, traccion, velocidadMinima, velocidadMaxima);
    }

    calcularMovimiento(terreno) {
        let movimiento = Math.floor(Math.random() * (this.velocidadMaxima - this.velocidadMinima + 1)) + this.velocidadMinima;
        
        if (this.traccion === 'Blanda') {
            if (terreno === "Lluvioso") {
                movimiento += 4;
            } else if (terreno === "Humedo") {
                movimiento += 2;
            }
        } else if (this.traccion === 'Mediana') {
            movimiento += 2;
        } else if (this.traccion === 'Dura') {
            if (terreno === "Seco") {
                movimiento += 4;
            } else if (terreno === "Humedo") {
                movimiento += 2;
            }
        }

        // console.log("Nuevo Movimiento "+ movimiento)
        return movimiento;
    }
}