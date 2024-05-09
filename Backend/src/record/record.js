import React, { useState, useEffect } from 'react';

function Historial() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // Aquí debes hacer una llamada a tu API para obtener el historial de reservass
    const data = obtenerHistorial(); // función ficticia que simula obtener datos de la API

    // Actualizamos el estado con los datos obtenidos
    setHistorial(data);
  }, []); // El segundo argumento [] indica que este efecto se ejecuta solo una vez al montar el componente

  return (
    <div>
      <h2>Historial de Reservas</h2>
      <ul>
        {historial.map((item, index) => (
          <li key={index}>
            <p>Fecha: {item.fecha}</p>
            <p>Tipo: {item.tipo}</p>
            {/* Agrega más detalles según la estructura de tus datos */}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Función ficticia
function obtenerHistorial() {
  // Por ahora, solo retornamos datos de ejemplo
  return [
    { fecha: '2024-05-01', tipo: 'Reserva de hotel' },
    { fecha: '2024-04-28', tipo: 'Reserva de habitación' },
    { fecha: '2024-04-28', tipo: 'Reserva de Evento' },
    // Agrega más datos según sea necesario
  ];
}

export default Historial;
