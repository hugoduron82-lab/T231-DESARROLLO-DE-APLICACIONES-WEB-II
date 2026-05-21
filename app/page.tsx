'use client';

import { useAppContext } from './context/AppContext';
import LoginForm from './components/LoginForm';
import PresupuestoForm from './components/PresupuestoForm';
import RegistroGasto from './components/RegistroGasto';
import ListaGastos from './components/ListaGastos';
import AlertaPresupuesto from './components/AlertaPresupuesto';

export default function Home() {
  const { autenticado, cerrarSesion, presupuesto } = useAppContext();

  if (!autenticado) {
    return <LoginForm />;
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Administrador de Gastos Personales</h1>
        <button
          onClick={cerrarSesion}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>

      {presupuesto > 0 && <AlertaPresupuesto />}
      <PresupuestoForm />
      <RegistroGasto />
      <ListaGastos />
    </main>
  );
}