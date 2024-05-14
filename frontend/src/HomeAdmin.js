import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DataTable from "./DataTable";
import Chart from "./Chart";

const HomeAdmin = () => {
  const [selectedNode, setSelectedNode] = useState("");
  const [nodeData, setNodeData] = useState([]);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    navigate("/"); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <Container>
      <Title>Administrar Nodos</Title>
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
      <NodeSelection>
        <label>Seleccionar Nodo:</label>
        <select value={selectedNode} onChange={handleNodeChange}>
          <option value="">Seleccionar Nodo</option>
          <option value="1">Nodo 1</option>
          <option value="2">Nodo 2</option>
          {}
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

const LogoutButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default HomeAdmin;


