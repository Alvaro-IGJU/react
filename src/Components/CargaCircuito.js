import React, { useState, useEffect } from "react";
import { ShowCircuitos } from "./ShowCircuitos.js";
import { ParticipantesEstadisticas } from "./ParticipantesEstadisticas.js";
import Podio from './Podio'; // Importa el componente del Podio

export function CargaCircuito({ arrayCircuitos, arrayParticipantes }) {
    const [circuitos, setCircuitos] = useState([]);
    const [mostrarDiv, setMostrarDiv] = useState(false);
    const [circuitoElegido, setCircuitoElegido] = useState(null);
    const [movimiento, setMovimiento] = useState(true); // Nuevo estado para controlar el movimiento
    const [participantes, setParticipantes] = useState([]);
    const [finishedPlayers, setFinishedPlayers] = useState([]);
    const [showPodio, setShowPodio] = useState(false);


    useEffect(() => {
        if (arrayCircuitos !== "") {
            setCircuitos(arrayCircuitos);
        }
    }, [arrayCircuitos]);

    useEffect(() => {
        if (arrayParticipantes !== '') {
            setParticipantes(arrayParticipantes);
        }

    }, [arrayParticipantes]);

    function seleccionarCircuito() {
        const nameCircuito = document.getElementById("cargarCircuitos").value;
        const circuito = circuitos.find((option) => option.nombre === nameCircuito);
        if (circuito) {
            setCircuitoElegido(circuito);
            setMostrarDiv(true);
            circuito.participantes.forEach((participante) => {
                participante.newParticipante.actualPos = 0;
                participante.newParticipante.moving = false;
            })
        }
    }

    function iniciarMovimiento() {
        setFinishedPlayers([])
        setMovimiento(true);
        setCircuitoElegido((prevCircuito) => {
            const nuevoCircuito = { ...prevCircuito };
            nuevoCircuito.participantes.forEach((participante) => {
                participante.newParticipante.actualPos = 0; // Reiniciar la posición a 0
                participante.newParticipante.moving = true;
            });
            return nuevoCircuito;
        });
    
        // Actualizar la posición cada medio segundo (500ms)
        const intervalId = setInterval(() => {
            setCircuitoElegido((prevCircuito) => {
                const nuevoCircuito = { ...prevCircuito };
                nuevoCircuito.participantes = nuevoCircuito.participantes.map((participante) => {
                    if (participante.newParticipante.moving) {
                        if (participante.newParticipante.actualPos + 50 < circuitoElegido.longitud) {
                            // Simulación del movimiento hacia la derecha, puedes ajustar la lógica según tu necesidad
                            let nuevoMovimiento = participante.newParticipante.vehiculo.calcularMovimiento(nuevoCircuito.tiempo);
    
                            // Suma el nuevoMovimiento al marginLeft actual del participante
                            let nuevaPos = parseInt(participante.newParticipante.actualPos) + parseInt(nuevoMovimiento);
                            participante.newParticipante.actualPos = nuevaPos;
                        } else {
                            if (participante.newParticipante.moving) {
                                setFinishedPlayers((prevFinishedPlayers) => {
                                    let updatedFinishedPlayers = [...prevFinishedPlayers];
    
                                    if (updatedFinishedPlayers.length === 0) {
                                        participante.newParticipante.posiciones.primero++;
                                        updatedFinishedPlayers.push(participante.newParticipante);
                                    } else if (updatedFinishedPlayers.length === 1) {
                                        participante.newParticipante.posiciones.segundo++;
                                        updatedFinishedPlayers.push(participante.newParticipante);
                                    } else if (updatedFinishedPlayers.length === 2) {
                                        participante.newParticipante.posiciones.tercero++;
                                        updatedFinishedPlayers.push(participante.newParticipante);
                                    } else {
                                        participante.newParticipante.posiciones.fueraDelPodio++;
                                        updatedFinishedPlayers.push(participante.newParticipante);
                                    }
    
                                    if (updatedFinishedPlayers.length === nuevoCircuito.participantes.length) {
                                        setShowPodio(true);
                                        clearInterval(intervalId);
                                    }
                                    return updatedFinishedPlayers;
                                });
    
                                participante.newParticipante.actualPos = circuitoElegido.longitud - 50;
                                participante.newParticipante.moving = false;
                            }
                        }
                    }
                    return { ...participante, marginLeft: `${participante.newParticipante.actualPos}` };
                });
                return nuevoCircuito;
            });
        }, 500);
    }
    

    return (
        <div>
            <ShowCircuitos newCircuito={circuitos}></ShowCircuitos>
            <hr class="separator"></hr>
            <h3>Cargar circuito</h3>
            <select placeholder="Circuitos" id="cargarCircuitos">
                {circuitos.map((option, index) => (
                    <option key={index}>{option.nombre}</option>
                ))}
            </select>
            <button onClick={seleccionarCircuito}>Cargar circuito</button>

            {mostrarDiv && circuitoElegido && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3>Circuito cargado:</h3>
                    <div class="card" style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                        <div  style={{ marginRight: '10px' }}><b>Circuito:</b> {circuitoElegido.nombre}</div>
                        <div  style={{ marginRight: '10px' }}><b>Tiempo:</b> {circuitoElegido.tiempo}</div>
                        <div><b>Longitud:</b> {circuitoElegido.longitud}</div>
                        <button onClick={iniciarMovimiento}>START</button>
                    </div>
                    
                    <div style={{ border: '1px solid black',display:"inline-block", margin: "4%",width:"fit-content", backgroundImage:"url('../Img/pista.avif')" }}>
                        <div class="pista"  style={{ border: '1px solid black', width: `${circuitoElegido.longitud}px` }}>
                            {circuitoElegido.participantes.map((option, index) => (
                                <div
                                    style={{
                                        padding:"5px",
                                        textAlign:"center",
                                        backgroundColor:"white",
                                        border: '1px solid black',
                                        borderRadius:"10px",
                                        width: "50px",
                                        marginTop: "3%",
                                        marginBottom: "3%",
                                        marginLeft: `${option.marginLeft}px` // Aplica el margen izquierdo dinámico
                                    }}
                                    key={index}
                                >
                                    {option.newParticipante.nombre}
                                </div>
                            ))}
                        </div>
                       
                    </div>
                    {showPodio && (
                        <div class="card">
                            <Podio finishedPlayers={finishedPlayers} />
                        </div>
                    )}
                                      
                                      <hr class="separator"></hr>
                    <ParticipantesEstadisticas newCircuito={circuitos} arrayParticipantes={participantes}></ParticipantesEstadisticas>
                </div>
            )}
        </div>
    );
}
