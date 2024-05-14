import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ nodeData }) => {
  const labels = nodeData.map((dataItem) =>
    new Date(dataItem.Fecha_Hora).toLocaleString()
  );
  const temperaturaData = nodeData.map((dataItem) => dataItem.Temperatura);
  const humedadData = nodeData.map((dataItem) => dataItem.Humedad);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: temperaturaData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Humedad (%)",
        data: humedadData,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute', // Especifica la unidad de tiempo para las etiquetas del eje X
          displayFormats: {
            minute: 'HH:mm', // Formato de visualización para las etiquetas de minutos
          }
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
