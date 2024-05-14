import React from "react";
import ReactApexChart from "react-apexcharts";

const TemperatureChart = ({ nodeData }) => {
  const labels = nodeData.map((dataItem) => new Date(dataItem.Fecha_Hora).toLocaleString());
  const temperaturaData = nodeData.map((dataItem) => dataItem.Temperatura);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    series: [
      {
        name: "Temperatura (°C)",
        data: temperaturaData,
      },
    ],
    xaxis: {
      categories: labels,
    },
    yaxis: {
      title: {
        text: "Temperatura (°C)",
      },
    },
  };

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={350} />
    </div>
  );
};

export default TemperatureChart;
