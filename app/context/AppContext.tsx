'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Gasto } from '../modelos/Gasto';

interface AppContextType {
  autenticado: boolean;
  presupuesto: number;
  gastos: Gasto[];
  cargando: boolean;
  error: string | null;
  mensajeExito: string | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
  establecerPresupuesto: (monto: number) => void;
  agregarGasto: (gasto: Omit<Gasto, 'idgasto'>) => Promise<boolean>;
  cargarGastos: () => Promise<void>;
  calcularTotalGastos: () => number;
  calcularPorcentaje: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [presupuesto, setPresupuesto] = useState<number>(0);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const apiUrl: string = 'http://localhost:5000/gasto';

  const cargarGastos = async (): Promise<void> => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(apiUrl);
      if (!respuesta.ok) throw new Error('Error al cargar gastos');
      const datos: Gasto[] = await respuesta.json();
      setGastos(datos);
    } catch (err) {
      setError('No se pudieron cargar los gastos. ¿El backend está corriendo?');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const iniciarSesion = (usuario: string, clave: string): boolean => {
    if (usuario === 'admin' && clave === 'admin123') {
      setAutenticado(true);
      setError(null);
      return true;
    } else {
      setError('Usuario o contraseña incorrectos');
      return false;
    }
  };

  const cerrarSesion = (): void => {
    setAutenticado(false);
    setPresupuesto(0);
    setGastos([]);
    setError(null);
    setMensajeExito(null);
  };

  const establecerPresupuesto = (monto: number): void => {
    setPresupuesto(monto);
    localStorage.setItem('presupuesto', monto.toString());
  };

  const agregarGasto = async (gasto: Omit<Gasto, 'idgasto'>): Promise<boolean> => {
    setCargando(true);
    setError(null);
    setMensajeExito(null);
    try {
      const respuesta = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gasto),
      });
      if (!respuesta.ok) throw new Error('Error al guardar gasto');
      setMensajeExito('Gasto agregado correctamente');
      await cargarGastos();
      return true;
    } catch (err) {
      setError('No se pudo registrar el gasto. Verifique el backend.');
      console.error(err);
      return false;
    } finally {
      setCargando(false);
    }
  };

  const calcularTotalGastos = (): number => {
    return gastos.reduce((total, g) => total + g.monto, 0);
  };

  const calcularPorcentaje = (): number => {
    if (presupuesto === 0) return 0;
    return (calcularTotalGastos() / presupuesto) * 100;
  };

  useEffect(() => {
    if (autenticado) {
      cargarGastos();
    }
  }, [autenticado]);

  const value: AppContextType = {
    autenticado,
    presupuesto,
    gastos,
    cargando,
    error,
    mensajeExito,
    iniciarSesion,
    cerrarSesion,
    establecerPresupuesto,
    agregarGasto,
    cargarGastos,
    calcularTotalGastos,
    calcularPorcentaje,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider');
  }
  return context;
};