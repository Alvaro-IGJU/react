import React, { useState, useEffect } from "react";
import { Participante } from "../Models/Participante.js";
import { NewCircuito } from './NewCircuito.js';

export function GestionParticipantes({ newVehicle }) {
    const [vehicleOptions, setVehicleOptions] = useState([]);
    const [participante, setParticipante] = useState("");
    const [participantesDisponibles, setParticipantesDisponibles] = useState([
        "Mario",
        "Luigi",
        "Princesa Peach",
        "Yoshi",
        "Toad",
        "Bowser"
    ]);

    useEffect(() => {
        if (newVehicle !== '') {
            setVehicleOptions(prevOptions => [...prevOptions, newVehicle]);
        }
    }, [newVehicle]);

    function addParticipante() {
        let name = document.getElementById("participanteName").value;
        let vehicle;
        vehicleOptions.forEach((option) => {
            if (option.modelo === document.getElementById("participantVehicle").value) {
                vehicle = option;
            }
        });

        // Crear un nuevo array excluyendo el personaje seleccionado
        // const updatedParticipantesDisponibles = participantesDisponibles.filter(
        //     (participante) => participante !== name
        // );
        // setParticipantesDisponibles(updatedParticipantesDisponibles);

        setParticipante(new Participante(name, vehicle));
    }

    return (
        <div>
            {vehicleOptions.length > 0 && (
                <div>
                    <h3>Gestión de Participantes</h3>
                    <br />
                    <select placeholder="Nombre" id="participanteName">
                        {participantesDisponibles.map((participante, index) => (
                            <option key={index} value={participante}>{participante}</option>
                        ))}
                    </select>
                    <br />
                    <select placeholder="Vehiculo" id="participantVehicle">
                        {vehicleOptions.map((option, index) => (
                            <option key={index}>{option.modelo}</option>
                        ))}
                    </select>
                    <br />
                    <input type="text" placeholder="Estadísticas" id="participantEstadisticas" />
                    <br />
                    <button onClick={addParticipante}>Guardar Participante</button>
                    <br />
                    <button>Cargar Estadísticas</button>
                    <br />
                    <NewCircuito newParticipante={participante}></NewCircuito>
                </div>
            )}
        </div>
    );
}
