import React from "react";
import styled from "styled-components";

const DataTable = ({ nodeData }) => {
  return (
    <Wrapper>
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
          {nodeData.map((dataItem, index) => (
            <tr key={index}>
              <td>{new Date(dataItem.Fecha_Hora).toLocaleString()}</td>
              <td>{dataItem.Temperatura}</td>
              <td>{dataItem.Estado_Temperatura}</td>
              <td>{dataItem.Humedad}</td>
              <td>{dataItem.Estado_Humedad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
  }
`;

export default DataTable;
