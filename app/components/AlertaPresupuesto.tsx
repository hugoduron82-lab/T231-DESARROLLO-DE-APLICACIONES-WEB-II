'use client';

import React from 'react';
import { useAppContext } from '../context/AppContext';

const AlertaPresupuesto: React.FC = () => {
  const { presupuesto, calcularTotalGastos, calcularPorcentaje } = useAppContext();
  const totalGastado = calcularTotalGastos();
  const porcentaje = calcularPorcentaje();

  if (presupuesto === 0) return null;

  if (porcentaje >= 100) {
    return (
      <div className="bg-red-100 border-l-4 border-red-600 text-red-700 p-4 mb-4 rounded">
        <p className="font-bold">¡Alerta!</p>
        <p>Has superado el límite del presupuesto, debes ajustar gastos.</p>
        <p className="text-sm">
          Gastado: L{totalGastado.toFixed(2)} / L{presupuesto.toFixed(2)}
        </p>
      </div>
    );
  }

  if (porcentaje >= 80) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-600 text-yellow-700 p-4 mb-4 rounded">
        <p className="font-bold">¡Cuidado!</p>
        <p>Has alcanzado el 80% de tu presupuesto mensual.</p>
        <p className="text-sm">
          Gastado: L{totalGastado.toFixed(2)} / L{presupuesto.toFixed(2)} ({porcentaje.toFixed(1)}%)
        </p>
      </div>
    );
  }

  return null;
};

export default AlertaPresupuesto;