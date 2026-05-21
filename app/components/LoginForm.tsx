'use client';

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LoginForm: React.FC = () => {
  const { iniciarSesion, error } = useAppContext();
  const [usuario, setUsuario] = useState<string>('');
  const [clave, setClave] = useState<string>('');

  const manejarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    iniciarSesion(usuario, clave);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Inicio de Sesión</h2>
        <form onSubmit={manejarSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Usuario</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>
        <p className="text-xs text-center text-gray-500 mt-4">
          Usuario: admin / Contraseña: admin123
        </p>
      </div>
    </div>
  );
};

export default LoginForm;