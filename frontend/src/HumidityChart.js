import React from "react";
import ReactApexChart from "react-apexcharts";

const HumidityChart = ({ nodeData }) => {
  const labels = nodeData.map((dataItem) => new Date(dataItem.Fecha_Hora).toLocaleString());
  const humedadData = nodeData.map((dataItem) => dataItem.Humedad);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    series: [
      {
        name: "Humedad (%)",
        data: humedadData,
      },
    ],
    xaxis: {
      categories: labels,
    },
    yaxis: {
      title: {
        text: "Humedad (%)",
      },
    },
  };

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={350} />
    </div>
  );
};

export default HumidityChart;
