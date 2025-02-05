import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../Layout/Footer";
const ipBack = process.env.REACT_APP_BASE_URL;



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Estatistikak = () => {
  const [data, setData] = useState({ fronton: 0, trinkete: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularityData = async () => {
      try {
        const response = await axios.get(`${ipBack}/api/tournaments/popularity`);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Errorea:', error);
        setLoading(false);
      }
    };

    fetchPopularityData();
  }, []);

  // Datos para el gráfico
  const chartData = {
    labels: ['Trinketea', 'Frontoia'],
    datasets: [
      {
        label: 'Parte-hartzaile kopurua',
        data: [data.trinkete, data.fronton],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      }
    ]
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Txapelketen ospea: Trinketea vs Frontoia',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} parte-hartzaile`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Txapelketa mota'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Parte-hartzaile kopurua'
        },
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdmin />
      <div className="container mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Txapelketen ospearen estatistikak</h1>
        </div>
        {loading ? (
          <p>Estatistikak kargatzen...</p>
        ) : (
          <div className="chart-container">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Estatistikak;
