export class Participante {
    constructor(nombre, vehiculo) {
      this._nombre = nombre;
      this._vehiculo = vehiculo;
      this._actualPos = 0;
      this._moving = false;
      this._posiciones = {
        primero: 0,
        segundo: 0,
        tercero: 0,
        fueraDelPodio: 0,
      };
    }
  
    get nombre() {
      return this._nombre;
    }
  
    set nombre(nuevoNombre) {
      this._nombre = nuevoNombre;
    }
  
    get vehiculo() {
      return this._vehiculo;
    }
  
    set vehiculo(nuevoVehiculo) {
      this._vehiculo = nuevoVehiculo;
    }
  
    get actualPos() {
      return this._actualPos;
    }
  
    set actualPos(nuevaPosicion) {
      this._actualPos = nuevaPosicion;
    }
  
    get moving() {
      return this._moving;
    }
  
    set moving(nuevoMoving) {
      this._moving = nuevoMoving;
    }
  
    get posiciones() {
      return this._posiciones;
    }
  
    set posiciones(nuevasPosiciones) {
      this._posiciones = nuevasPosiciones;
    }
  }
  