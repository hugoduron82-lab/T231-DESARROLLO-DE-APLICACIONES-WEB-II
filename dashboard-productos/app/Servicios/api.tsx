import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Obtener todos los productos
export const getProductos = async () => {
  const response = await axios.get(`${API_URL}/productos`);
  return response.data.data;
};

// Obtener valor total por tipo de producto
export const getValorTotalPorTipo = async () => {
  const response = await axios.get(`${API_URL}/valor-total-por-tipo`);
  return response.data.data;
};

// Obtener valor máximo y mínimo por tipo de producto
export const getMinMaxPorTipo = async () => {
  const response = await axios.get(`${API_URL}/min-max-por-tipo`);
  return response.data.data;
};

// Obtener cantidad de productos por status
export const getConteoPorStatus = async () => {
  const response = await axios.get(`${API_URL}/conteo-por-status`);
  return response.data.data;
};

// Obtener valor total por marca
export const getValorTotalPorMarca = async () => {
  const response = await axios.get(`${API_URL}/valor-total-por-marca`);
  return response.data.data;
};