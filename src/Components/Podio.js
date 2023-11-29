import React from 'react';

const Podio = ({ finishedPlayers }) => {
    console.log(finishedPlayers)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Podio</h2>
      {finishedPlayers.slice(0, 3).map((player, index) => (
        <div key={index}>
          <p>
            {index + 1}° lugar: {player.nombre}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Podio;
