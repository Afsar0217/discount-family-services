// API Configuration for different environments
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export const API_ENDPOINTS = {
  BOOKINGS: `${API_BASE_URL}/api/bookings`,
};

export { API_BASE_URL };