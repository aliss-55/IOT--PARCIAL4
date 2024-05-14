import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const HomeUser = ({ userHome }) => {
  const [sensorData, setSensorData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/datos/${userHome}`);

        if (response.data && response.data.length > 0) {
          const latestData = response.data.slice(-5); // Obtener los últimos cinco registros
          setSensorData(latestData.reverse()); // Invertir el array para mostrar los últimos datos arriba
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Intervalo de actualización cada 5 segundos
    return () => clearInterval(intervalId);
  }, [userHome]);

  const handleLogout = () => {
    navigate("/"); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
      <Title>Camión #{userHome}</Title>
      <ContentWrapper>
        <DataTable>
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Temperatura</th>
              <th>Estado de Temperatura</th>
              <th>Humedad</th>
              <th>Estado de Humedad</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((data, index) => (
              <tr key={index}>
                <td>{data.Fecha_Hora}</td>
                <td>{data.Temperatura}</td>
                <td>{data.Estado_Temperatura}</td>
                <td>{data.Humedad}</td>
                <td>{data.Estado_Humedad}</td>
              </tr>
            ))}
          </tbody>
        </DataTable>
        <ChartsWrapper>
          <ChartContainer>
            <ChartTitle>Temperatura</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sensorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="Fecha_Hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Temperatura" fill="#FF5733" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <ChartContainer>
            <ChartTitle>Humedad</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sensorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="Fecha_Hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Humedad" fill="#007BFF" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartsWrapper>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
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

const Title = styled.h2`
  color: #343a40;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
`;

const ChartsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const ChartContainer = styled.div`
  width: 48%; /* Ancho ajustado para que quepan dos gráficos en una fila */
  height: 350px;
`;

const ChartTitle = styled.h3`
  color: #343a40;
  margin-bottom: 10px;
`;

export default HomeUser;





