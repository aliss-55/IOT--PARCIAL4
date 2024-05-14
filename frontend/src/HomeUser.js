import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeUser = ({ userHome }) => {
  const [temperatura, setTemperatura] = useState(0);
  const [temperaturaEstado, setTemperaturaEstado] = useState("Desconocido");
  const [humedad, setHumedad] = useState(0);
  const [humedadEstado, setHumedadEstado] = useState("Desconocido");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/datos/${userHome}`);

        if (response.data && response.data.length > 0) {
          const data = response.data[0];

          setTemperatura(data.Temperatura || 0);
          setTemperaturaEstado(data.Estado_Temperatura || "Desconocido");
          setHumedad(data.Humedad || 0);
          setHumedadEstado(data.Estado_Humedad || "Desconocido");
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
      <Title>Camion # {userHome}</Title>
      <ContentWrapper>
        <SensorSection>
          <SensorInfo>
            <InfoLabel>Temperatura</InfoLabel>
            <InfoValue>Estado: {temperaturaEstado}</InfoValue>
          </SensorInfo>
          <Speedometer value={temperatura} color="#FF5733" size={250} />
        </SensorSection>
        <SensorSection>
          <SensorInfo>
            <InfoLabel>Humedad</InfoLabel>
            <InfoValue>Estado: {humedadEstado}</InfoValue>
          </SensorInfo>
          <Speedometer value={humedad} color="#007BFF" size={250} />
        </SensorSection>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #e6f2ff;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  align-items: center;
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
  justify-content: space-around;
  margin-top: 30px;
`;

const SensorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SensorInfo = styled.div`
  margin-bottom: 10px;
`;

const InfoLabel = styled.p`
  font-weight: bold;
  color: #343a40;
`;

const InfoValue = styled.p`
  font-size: 16px;
  color: #555;
`;

const Speedometer = ({ value, color, size }) => (
  <ReactSpeedometer
    maxValue={100}
    value={value}
    needleColor={color}
    startColor={color}
    segments={5}
    endColor={color}
    width={size}
    height={size * 0.6} // Ajusta la altura proporcionalmente al tamaño
  />
);

export default HomeUser;



