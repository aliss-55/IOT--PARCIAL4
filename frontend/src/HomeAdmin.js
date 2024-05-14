import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import DataTable from "./DataTable";
import Chart from "./Chart";

const HomeAdmin = () => {
  const [selectedNode, setSelectedNode] = useState("");
  const [nodeData, setNodeData] = useState([]);

  // Función para cargar los datos del nodo seleccionado
  const loadNodeData = async (nodeId) => {
    try {
      const response = await axios.get(`http://localhost:3030/datos/${nodeId}`);
      setNodeData(response.data);
    } catch (error) {
      console.error("Error al cargar datos del nodo:", error);
      setNodeData([]);
    }
  };

  // Manejar cambios en la selección del nodo
  const handleNodeChange = (event) => {
    const nodeId = event.target.value;
    setSelectedNode(nodeId);
    loadNodeData(nodeId);
  };

  return (
    <Container>
      <Title>Administrar Nodos</Title>
      <NodeSelection>
        <label>Seleccionar Nodo:</label>
        <select value={selectedNode} onChange={handleNodeChange}>
          <option value="">Seleccionar Nodo</option>
          <option value="1">Nodo 1</option>
          <option value="2">Nodo 2</option>
          {/* Agrega más opciones según tus nodos disponibles */}
        </select>
      </NodeSelection>
      {nodeData.length > 0 && (
        <div>
          <DataTable nodeData={nodeData} />
          <Chart nodeData={nodeData} />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #343a40;
  margin-bottom: 20px;
`;

const NodeSelection = styled.div`
  margin-bottom: 20px;

  label {
    margin-right: 10px;
  }

  select {
    padding: 8px;
    font-size: 16px;
  }
`;

export default HomeAdmin;


