import React, { useState, useEffect } from "react";

export function CargaCircuito({ arrayCircuitos }) {
    const [circuitos, setCircuitos] = useState([]);
    const [mostrarDiv, setMostrarDiv] = useState(false);
    const [circuitoElegido, setCircuitoElegido] = useState(null);
    const [movimiento, setMovimiento] = useState(false); // Nuevo estado para controlar el movimiento

    useEffect(() => {
        if (arrayCircuitos !== "") {
            setCircuitos(arrayCircuitos);
        }
    }, [arrayCircuitos]);

    function seleccionarCircuito() {
        const nameCircuito = document.getElementById("cargarCircuitos").value;
        const circuito = circuitos.find((option) => option.nombre === nameCircuito);
        if (circuito) {
            setCircuitoElegido(circuito);
            setMostrarDiv(true);
        }
    }

    function iniciarMovimiento() {
        setMovimiento(true);
        // Reiniciar la posición de los participantes a 0
        setCircuitoElegido(prevCircuito => {
            const nuevoCircuito = { ...prevCircuito };
            nuevoCircuito.participantes.forEach(participante => {
                participante.newParticipante.actualPos = 0; // Reiniciar la posición a 0
            });
            return nuevoCircuito;
        });
        // Actualizar la posición cada medio segundo (500ms)
        setInterval(() => {
            // Mueve los participantes a la derecha
            setCircuitoElegido((prevCircuito) => {
                const nuevoCircuito = { ...prevCircuito };
                nuevoCircuito.participantes = nuevoCircuito.participantes.map((participante) => {
                    if (participante.newParticipante.actualPos + 50 < circuitoElegido.longitud) {
                        // Simulación del movimiento hacia la derecha, puedes ajustar la lógica según tu necesidad
                        let nuevoMovimiento = participante.newParticipante.vehiculo.calcularMovimiento(nuevoCircuito.tiempo);

                        // Suma el nuevoMovimiento al marginLeft actual del participante
                        let nuevaPos = parseInt(participante.newParticipante.actualPos) + parseInt(nuevoMovimiento);
                        participante.newParticipante.actualPos = nuevaPos;
                    } else {
                        participante.newParticipante.actualPos = circuitoElegido.longitud - 50;
                    }
                    return { ...participante, marginLeft: `${participante.newParticipante.actualPos}` };
                });

                return nuevoCircuito;
            });
        }, 500);
    }

    return (
        <div>
            <h1>Cargar circuito</h1>
            <select placeholder="Circuitos" id="cargarCircuitos">
                {circuitos.map((option, index) => (
                    <option key={index}>{option.nombre}</option>
                ))}
            </select>
            <button onClick={seleccionarCircuito}>Cargar circuito</button>

            {mostrarDiv && circuitoElegido && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2>Circuito cargado:</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                        <div style={{ marginRight: '10px' }}><b>Circuito:</b> {circuitoElegido.nombre}</div>
                        <div style={{ marginRight: '10px' }}><b>Tiempo:</b> {circuitoElegido.tiempo}</div>
                        <div><b>Longitud:</b> {circuitoElegido.longitud}</div>
                        <button onClick={iniciarMovimiento}>START</button>
                    </div>
                    <div style={{ border: '1px solid black', margin: "4%", display: "flex" }}>
                        <div style={{ border: '1px solid black', width: `${circuitoElegido.longitud}px` }}>
                            {circuitoElegido.participantes.map((option, index) => (
                                <div
                                    style={{
                                        border: '1px solid black',
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
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%" }}>
                            <p>FINISH</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
