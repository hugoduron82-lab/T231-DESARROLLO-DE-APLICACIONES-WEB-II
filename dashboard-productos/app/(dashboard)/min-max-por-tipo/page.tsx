'use client';
import { getMinMaxPorTipo } from '@/app/Servicios/api';
import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function page() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Valor Máximo',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Valor Mínimo',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  });

  useEffect(() => {
    getMinMaxPorTipo()
      .then((data) => {
        const labels = data.map((item: any) => item.productType);
        const maximos = data.map((item: any) => item.valor_maximo);
        const minimos = data.map((item: any) => item.valor_minimo);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Valor Máximo',
              data: maximos,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              borderRadius: 6,
            },
            {
              label: 'Valor Mínimo',
              data: minimos,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              borderRadius: 6,
            },
          ],
        });
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: { backgroundColor: '#333' },
    },
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Valor Máximo y Mínimo por Tipo de Producto
      </h1>
      <div className="h-96">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}