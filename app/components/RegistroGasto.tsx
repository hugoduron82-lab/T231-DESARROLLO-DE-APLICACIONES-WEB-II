'use client';

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const CATEGORIAS_SUGERIDAS: string[] = ['Comida', 'Transporte', 'Entretenimiento', 'Ropa', 'Salud', 'Educación'];

const RegistroGasto: React.FC = () => {
  const { agregarGasto, cargando, mensajeExito, error } = useAppContext();
  const [categoria, setCategoria] = useState<string>('');
  const [monto, setMonto] = useState<string>('');
  const [fecha, setFecha] = useState<string>(new Date().toISOString().split('T')[0]);

  const manejarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoria || !monto || !fecha) {
      alert('Por favor complete todos los campos (categoría, monto, fecha)');
      return;
    }
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      alert('El monto debe ser un número positivo');
      return;
    }

    const exito = await agregarGasto({ categoria, monto: montoNum, fecha });
    if (exito) {
      setCategoria('');
      setMonto('');
      setFecha(new Date().toISOString().split('T')[0]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Registrar nuevo gasto</h3>
      {mensajeExito && <p className="text-green-600 mb-2">{mensajeExito}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={manejarSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Categoría *</label>
          <input
            type="text"
            list="categorias"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            placeholder="Ej: Comida, Transporte, o crea una nueva"
          />
          <datalist id="categorias">
            {CATEGORIAS_SUGERIDAS.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Monto (L) *</label>
          <input
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Fecha *</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {cargando ? 'Guardando...' : 'Agregar gasto'}
        </button>
      </form>
    </div>
  );
};

export default RegistroGasto;