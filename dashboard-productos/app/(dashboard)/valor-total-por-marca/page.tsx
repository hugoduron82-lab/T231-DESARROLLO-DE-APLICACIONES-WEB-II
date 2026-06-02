'use client';
import { getValorTotalPorMarca } from '@/app/Servicios/api';
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
        label: 'Valor Total',
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  });

  useEffect(() => {
    getValorTotalPorMarca()
      .then((data) => {
        const labels = data.map((item: any) => item.brandCode);
        const valores = data.map((item: any) => item.valor_total);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Valor Total (USD)',
              data: valores,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
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
        Valor Total por Marca
      </h1>
      <div className="h-96">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}