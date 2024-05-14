import React from "react";
import styled from "styled-components";

const DataTable = ({ nodeData }) => {
  // Filtrar y ordenar los datos para mostrar los últimos cinco registros primero
  const sortedData = nodeData.slice().reverse().slice(0, 5); // Obtener los últimos cinco registros y revertir el orden

  return (
    <TableWrapper>
      <h3>Últimos cinco datos:</h3>
      <Table>
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Temperatura (°C)</th>
            <th>Estado de Temperatura</th>
            <th>Humedad (%)</th>
            <th>Estado de Humedad</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={index}>
              <td>{data.Fecha_Hora}</td>
              <td>{data.Temperatura}</td>
              <td>{data.Estado_Temperatura}</td>
              <td>{data.Humedad}</td>
              <td>{data.Estado_Humedad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`;

export default DataTable;

