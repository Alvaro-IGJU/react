import {Vehiculo} from "./Vehiculo";
export class Motocicleta extends Vehiculo {
    constructor(modelo, traccion, velocidadMinima, velocidadMaxima) {
      super(modelo, traccion, velocidadMinima, velocidadMaxima);
      this.turnosBloqueados = 0;
    }
  
    calcularMovimiento(terreno) {
      let movimiento = Math.floor(Math.random() * (this.velocidadMaxima - this.velocidadMinima + 1)) + this.velocidadMinima;
  
      if (this.traccion === 'dura') {
        movimiento += 5;
      } else if (this.traccion === 'mediana') {
        movimiento += 2;
      }
  
      if(this.turnosBloqueados === 0){
        let cae = this.caeAlSuelo(terreno);
        if(cae){
            movimiento = 0;
            this.turnosBloqueados = 5;
        }
      }else{
        movimiento = 0;
        this.turnosBloqueados--;
      }
    
  
      return movimiento;
    }

    caeAlSuelo(terreno) {
        let cae = false;
        let probabilidad = Math.random() * 100; // Genera un número aleatorio entre 0 y 100
      
        if (terreno === "mojado" && this.traccion === "dura") {
          if (probabilidad < 30) {
            cae = true;
          }
        } else if (terreno === "humedo" && this.traccion === "dura" || terreno === "mojado" && this.traccion === "media") {
          if (probabilidad < 20) {
            cae = true;
          }
        }else if (terreno === "humedo" && this.traccion === "media") {
          if (probabilidad < 10) {
            cae = true;
          }
        } else {
          if (probabilidad < 5) {
            cae = true;
          }
        }
      
        return cae;
      }
      

    
  }
  