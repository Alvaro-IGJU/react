import { useState } from "react";
import {GestionParticipantes} from './GestionParticipantes.js';
import {NewVehiculo} from './NewVehiculo.js';
import {NewCircuito} from './NewCircuito.js';
import {AssignParticipant} from './AssignParticipant.js';
export function CarreraSimulator() {
    const [participantes, setParticipantes] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [circuitos, setCircuitos] = useState([]);

    
    return (
        <div>
           <h1>Carga circuito</h1>
        </div>);
}