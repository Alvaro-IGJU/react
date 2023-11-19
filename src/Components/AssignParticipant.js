import { useState, useEffect } from "react";
import {CargaCircuito} from "./CargaCircuito.js";

export function AssignParticipant({newCircuito,arrayParticipantes}) {
    const [circuitos, setCircuitos] = useState([]);
    const [participantes, setParticipantes] = useState([]);

    useEffect(() => {
        if (arrayParticipantes != '') {
            setParticipantes(arrayParticipantes);
        }
    }, [arrayParticipantes]);

    useEffect(() => {
        if (newCircuito != '') {
            setCircuitos(prevCircuitos => [...prevCircuitos, newCircuito]);
        }
    }, [newCircuito]);
    
    console.log(circuitos)
    function addParticipant(){
        let circuito;
        let nameCircuito = document.getElementById("assignCircuito").value;
        circuitos.map((option, index) => {
            if (option.nombre === nameCircuito) {
              circuito = option;
            }
        })

        let nameParticipant = document.getElementById("assignParticipant").value;
        participantes.map((option, index) => {
            if (option.newParticipante.nombre === nameParticipant) {
              circuito.participantes.push(option);
            }
        })
        console.log(circuito.participantes)
    }

    function quitParticipant() {
        let circuito;
        let nameCircuito = document.getElementById("deleteCircuito").value;
    
        circuitos.map((option, index) => {
            if (option.nombre === nameCircuito) {
                circuito = option;
            }
        });
    
        let nameParticipant = document.getElementById("deleteParticipant").value;
    
        // Encuentra el índice del participante que coincide con el nombre
        let indexToDelete = circuito.participantes.findIndex(participante => participante.newParticipante.nombre === nameParticipant);
    
        if (indexToDelete !== -1) {
            circuito.participantes.splice(indexToDelete, 1); // Elimina el participante del array
        }
    
    }

    return (
        <div >
             {participantes.length > 0 && circuitos.length > 0 && (
                <div>
            <h3>Asigna un participante al circuito</h3>
            <select placeholder="Circuitos" id="assignCircuito">
            {circuitos.map((option, index) => (
                            <option key={index}>{option.nombre}</option>
                        ))} 
            </select>
            <select placeholder="Participantes" id="assignParticipant">
            {participantes.map((option, index) => (
                            <option key={index}>{option.newParticipante.nombre}</option>
                        ))} 
            </select>
            <button onClick={addParticipant}>Asignar</button>
            <h3>Quita un participante del circuito</h3>
            <select placeholder="Circuitos" id="deleteCircuito">
            {circuitos.map((option, index) => (
                            <option key={index}>{option.nombre}</option>
                        ))} 
            </select>
            <select placeholder="Participantes" id="deleteParticipant">
            {participantes.map((option, index) => (
                            <option key={index}>{option.newParticipante.nombre}</option>
                        ))} 
            </select>
            <button onClick={quitParticipant}>Quitar</button>
            <CargaCircuito arrayCircuitos={circuitos}></CargaCircuito>
            </div>
            
             )} 
        </div>);
}