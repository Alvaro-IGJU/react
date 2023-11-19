import { useState, useEffect } from "react";
import { Circuito } from "../Models/Circuito.js";
import { AssignParticipant } from "./AssignParticipant.js";


export function NewCircuito(newParticipante) {

    const [circuito, setCircuito] = useState([]);
    const [participantes, setParticipantes] = useState([]);
    
    useEffect(() => {
        if (newParticipante != '') {
            
            setParticipantes(prevParticipantes => [...prevParticipantes, newParticipante]);
            
        }
    }, [newParticipante]);

    function addCircuito() {
        let name = document.getElementById("circuitoName").value;
        let length = document.getElementById("circuitoLength").value;
        let weather = document.getElementById("circuitoWeather").value;

       setCircuito(new Circuito(name,weather,length));
    }

    return (
        <div >
            <h3>New Circuito</h3>
            <input type="text" placeholder="Nombre" id="circuitoName"></input>
            <input type="text" placeholder="Longitud" id="circuitoLength"></input>
            <select placeholder="Tiempo" id="circuitoWeather">
                <option>Lluvioso</option>
                <option>Humedo</option>
                <option>Seco</option>
            </select>
            <button onClick={addCircuito}>Nueva Carrera</button>
            <AssignParticipant newCircuito = {circuito} arrayParticipantes={participantes} ></AssignParticipant>
        </div>);
}