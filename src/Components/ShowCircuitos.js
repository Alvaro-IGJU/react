import { useState, useEffect } from "react";
import { Circuito } from "../Models/Circuito.js";

export function ShowCircuitos({ newCircuito }) {
    const [circuitos, setCircuitos] = useState([]);

    useEffect(() => {
        if (newCircuito !== '') {
            setCircuitos(newCircuito);
        }
    }, [newCircuito]);

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <h3>Show circuitos</h3>
            <div class="card" style={{display:"flex",justifyContent:"center", width:"80%", flexWrap:"wrap"}}>
                {circuitos.length > 0 ? (
                    circuitos.map((circuito, index) => (
                        <div key={index} style={{border:"1px solid white", width:"20%",margin:"10px"}}>
                            <h2>{circuito.nombre}</h2>
                            <p>{circuito.tiempo}</p>
                            <p>{circuito.longitud}</p>
                           
                            
                            {circuito.participantes.map((participante, i) => (
                                <p key={i}>{participante.newParticipante.nombre}</p>
                            ))}
                            {/* Aquí puedes mostrar más detalles del circuito si es necesario */}
                        </div>
                    ))
                ) : (
                    <p>No hay circuitos disponibles.</p>
                )}
            </div>
        </div>
    );
}
