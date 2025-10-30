// frontend/src/api.js
import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getToken = () => {
  // common token location (try a few)
  const t1 = localStorage.getItem('token');
  if (t1) return t1;
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.token) return user.token;
  } catch (e) {}
  return null;
};

const api = axios.create({
  baseURL: `${BASE}/api`,
});

// attach bearer automatically
api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default api;
