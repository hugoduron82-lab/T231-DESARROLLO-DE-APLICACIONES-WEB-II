import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800">Dashboard de Productos</h1>
          <div className="flex flex-wrap gap-4">
            <Link href="/valor-total-por-tipo" className="text-blue-600 hover:underline">
              Valor Total por Tipo
            </Link>
            <Link href="/min-max-por-tipo" className="text-blue-600 hover:underline">
              Mínimo y Máximo por Tipo
            </Link>
            <Link href="/conteo-por-status" className="text-blue-600 hover:underline">
              Conteo por Status
            </Link>
            <Link href="/valor-total-por-marca" className="text-blue-600 hover:underline">
              Valor Total por Marca
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">Bienvenido al Dashboard de Productos</h2>
        <p className="text-gray-600">Selecciona una opción del menú para visualizar los gráficos.</p>
      </main>
    </div>
  );
}