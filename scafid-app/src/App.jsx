import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [allRecords, setAllRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('https://x7r7roy305.execute-api.ca-central-1.amazonaws.com/dev/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const parsedData = JSON.parse(data.body); // Parse the JSON string inside the body field

      // Ensure that parsedData is an array
      if (Array.isArray(parsedData)) {
        setAllRecords(parsedData);
      } else {
        console.error('Expected an array but got:', parsedData);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(allRecords.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Cuenta</th>
            <th>Fecha Entrada Contraloría</th>
            <th>Seguimiento</th>
            <th>Ubicación</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => alert('Navigate to another page')}>...</button>
              </td>
              <td>{record.cuenta}</td>
              <td>{record.fecha_entrada_contraloria}</td>
              <td>{record.seguimiento}</td>
              <td>{record.ubicacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
    </div>
  );
}

export default App;
