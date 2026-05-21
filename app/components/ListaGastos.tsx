'use client';

import React from 'react';
import { useAppContext } from '../context/AppContext';

const ListaGastos: React.FC = () => {
  const { gastos, cargando, error, presupuesto, calcularTotalGastos } = useAppContext();
  const totalGastado = calcularTotalGastos();

  if (cargando && gastos.length === 0) {
    return <p className="text-center text-gray-500">Cargando gastos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Historial de Gastos</h3>
        {presupuesto > 0 && (
          <div className="text-right">
            <p className="text-sm text-gray-700">Presupuesto: L{presupuesto.toFixed(2)}</p>
            <p className="text-sm font-medium text-gray-800">Total gastado: L{totalGastado.toFixed(2)}</p>
          </div>
        )}
      </div>

      {gastos.length === 0 ? (
        <p className="text-gray-500 text-center">No hay gastos registrados aún.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left text-gray-700">Categoría</th>
                <th className="px-4 py-2 border-b text-left text-gray-700">Monto (L)</th>
                <th className="px-4 py-2 border-b text-left text-gray-700">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((gasto) => (
                <tr key={gasto.idgasto} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-gray-800">{gasto.categoria}</td>
                  <td className="px-4 py-2 border-b text-gray-800">L{gasto.monto.toFixed(2)}</td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {new Date(gasto.fecha).toLocaleDateString('es-HN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListaGastos;