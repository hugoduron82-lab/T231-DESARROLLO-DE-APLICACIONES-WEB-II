'use client';
import { getConteoPorStatus } from '@/app/Servicios/api';
import { Pie } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function page() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    getConteoPorStatus()
      .then((data) => {
        const labels = data.map((item: any) => item.status);
        const cantidades = data.map((item: any) => item.cantidad);
        setChartData({
          labels: labels,
          datasets: [
            {
              data: cantidades,
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
              ],
              borderColor: '#fff',
              borderWidth: 2,
            },
          ],
        });
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' as const },
      tooltip: { backgroundColor: '#333' },
    },
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Cantidad de Productos por Status
      </h1>
      <div className="h-96 flex justify-center">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}