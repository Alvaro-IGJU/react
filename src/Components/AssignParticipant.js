import { useState, useEffect } from "react";
import { CargaCircuito } from "./CargaCircuito.js";
export function AssignParticipant({ newCircuito, arrayParticipantes }) {
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

    function addParticipant() {
        let circuito;
        let nameCircuito = document.getElementById("assignCircuito").value;
        circuitos.map((option) => {
            if (option.nombre === nameCircuito) {
                circuito = option;
            }
        });

        let nameParticipant = document.getElementById("assignParticipant").value;

        // Verificar si el participante ya existe en el circuito
        const existingParticipantIndex = circuito.participantes.findIndex(
            (participant) => participant.newParticipante.nombre === nameParticipant
        );

        if (existingParticipantIndex !== -1) {
            // Si el participante ya existe, reemplaza sus datos
            circuito.participantes[existingParticipantIndex] = participantes.find(
                (participant) => participant.newParticipante.nombre === nameParticipant
            );
        } else {
            // Si el participante no existe, agrégalo al circuito
            participantes.map((option) => {
                if (option.newParticipante.nombre === nameParticipant) {
                    circuito.participantes.push(option);
                }
            });
        }

        // Actualizar el estado de circuitos después de agregar o reemplazar participantes
        setCircuitos([...circuitos]);
    }

    function quitParticipant() {
        let circuito;
        let nameCircuito = document.getElementById("deleteCircuito").value;

        circuitos.map((option, index) => {
            if (option.nombre === nameCircuito) {
                circuito = option;
            }
        });
        setCircuitos([...circuitos]);
        let nameParticipant = document.getElementById("deleteParticipant").value;

        // Encuentra el índice del participante que coincide con el nombre
        let indexToDelete = circuito.participantes.findIndex(participante => participante.newParticipante.nombre === nameParticipant);

        if (indexToDelete !== -1) {
            circuito.participantes.splice(indexToDelete, 1); // Elimina el participante del array
        }
        setCircuitos([...circuitos]);
    }

    return (
        <div >
            {participantes.length > 0 && circuitos.length > 0 && (
                <div class="container">
                    <div class="assignParticipants">
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
                            </div>
                            <div>
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
                    </div>
                    </div>
                    <hr class="separator"></hr>

                    <CargaCircuito arrayCircuitos={circuitos} arrayParticipantes={participantes}></CargaCircuito>
                </div>

            )}
        </div>);
}