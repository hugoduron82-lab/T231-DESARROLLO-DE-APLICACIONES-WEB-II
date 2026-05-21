'use client';

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const PresupuestoForm: React.FC = () => {
  const { presupuesto, establecerPresupuesto } = useAppContext();
  const [montoInput, setMontoInput] = useState<string>(presupuesto.toString());

  const manejarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const monto = parseFloat(montoInput);
    if (!isNaN(monto) && monto > 0) {
      establecerPresupuesto(monto);
    } else {
      alert('Ingrese un monto válido mayor a cero');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Presupuesto Mensual</h3>
      <form onSubmit={manejarSubmit} className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">Monto del presupuesto (L)</label>
          <input
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={montoInput}
            onChange={(e) => setMontoInput(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Establecer
        </button>
      </form>
      {presupuesto > 0 && (
        <p className="mt-2 text-gray-600">Presupuesto actual: L{presupuesto.toFixed(2)}</p>
      )}
    </div>
  );
};

export default PresupuestoForm;