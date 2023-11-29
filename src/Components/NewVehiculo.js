import { useState } from "react";
import { GestionParticipantes } from './GestionParticipantes.js';
import { NewCircuito } from './NewCircuito.js';
import { Coche } from "../Models/Coche.js";
import { Motocicleta } from "../Models/Motocicleta.js";

export function NewVehiculo() {
    const [vehiculo, setVehiculo] = useState("");
    const [vehiculosDisponibles, setVehiculosDisponibles] = useState([
        "Bólido", "Carruaje estándar", "Veloce", "Flame Rider", "Carroza", "Bowsario", "Egg 1"
    ]);

    function addVehiculo() {
        let modelo = document.getElementById("vehicleModel").value;
        let traccion = document.getElementById("vehicleTraccion").value;
        let minVel = document.getElementById("vehicleMinVel").value;
        let maxVel = document.getElementById("vehicleMaxVel").value;
        let tipo = document.getElementById("vehicleType").value;

        if (tipo === "Motocicleta") {
            setVehiculo(new Motocicleta(modelo, traccion, minVel, maxVel));
            setVehiculosDisponibles(prevVehiculos => {
                return prevVehiculos.filter(veh => veh !== modelo);
            });
        } else if (tipo === "Coche") {
            setVehiculo(new Coche(modelo, traccion, minVel, maxVel));

            // Remover el vehículo seleccionado de la lista de vehículos disponibles
            setVehiculosDisponibles(prevVehiculos => {
                return prevVehiculos.filter(veh => veh !== modelo);
            });
        }
    }

    return (
        <div>
            <div class="container">
                <h3>New Vehículo</h3><br />
                <select placeholder="Modelo" id="vehicleModel">
                    {vehiculosDisponibles.map((modelo, index) => (
                        <option key={index}>{modelo}</option>
                    ))}
                </select><br />
                <select placeholder="Tipo Tracción" id="vehicleTraccion">
                    <option>Blanda</option>
                    <option>Mediana</option>
                    <option>Dura</option>
                </select><br />
                <input type="number" placeholder="Min Vel" min="1"  id="vehicleMinVel" /><br />
                <input type="number" placeholder="Max Vel" min="2"  id="vehicleMaxVel" /><br />
                <select placeholder="Tipo Vehículo" id="vehicleType">
                    <option>Coche</option>
                    <option>Motocicleta</option>
                </select><br />
                <button onClick={addVehiculo}>Nuevo Vehículo</button><br />
                
            </div>
            <hr class="separator"></hr>
            <GestionParticipantes newVehicle={vehiculo} />
        </div>
    );
}