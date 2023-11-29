import { useState, useEffect } from "react";
import { Circuito } from "../Models/Circuito.js";

export function ParticipantesEstadisticas({ arrayParticipantes }) {
    const [participantes, setParticipantes] = useState(arrayParticipantes);

    useEffect(() => {
        if (arrayParticipantes !== '') {
            setParticipantes(arrayParticipantes);
        }

    }, [arrayParticipantes]);

    return (
        <div class="card" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            {participantes.map((p, index) => (
                <div key={index} style={{ margin: "10px", width: "200px", border: "1px solid white" }}>
                    <h2>{p.newParticipante.nombre}</h2>
                    <div style={{ margin: "10px", border: "1px solid white" }}>
                        <h4>Características vehículo</h4>
                        <p><b>Vehículo: </b>{p.newParticipante.vehiculo.modelo}</p>
                        <p><b>Tracción: </b>{p.newParticipante.vehiculo.traccion}</p>
                        <p><b>Vel. mínima: </b>{p.newParticipante.vehiculo.velocidadMinima}</p>
                        <p><b>Vel. máxima: </b>{p.newParticipante.vehiculo.velocidadMaxima}</p>

                    </div>
                    <div style={{ margin: "10px", border: "1px solid white" }}>
                        <h4>Estadísticas</h4>
                        <p><b>Primero: </b>{p.newParticipante.posiciones.primero}</p>
                        <p><b>Segundo: </b>{p.newParticipante.posiciones.segundo}</p>
                        <p><b>Tercero: </b>{p.newParticipante.posiciones.tercero}</p>
                        <p><b>Fuera del podio: </b>{p.newParticipante.posiciones.fueraDelPodio}</p>

                    </div>
                </div>
            ))}
        </div>
    );
}
