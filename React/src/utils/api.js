import axios from "axios";
import { BASE_URL } from "./constants";
import authProvider from "./AuthProvider";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el backend responde con 401, limpiar sesión y redirigir al login
      authProvider.deleteSession();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const api = {
  login: (credentials) => {
    return axiosInstance.post(`${BASE_URL}/auth/login`, credentials);
  },
  crearData: (endpoint, data) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axiosInstance.post(`${BASE_URL}/${endpoint}/`, data, {
      headers,
    });
  },
  getData: (endpoint, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axiosInstance.get(`${BASE_URL}/${endpoint}/${id}`, { headers });
  },
  listarData: (endpoint) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axiosInstance.get(`${BASE_URL}/${endpoint}/`, {
      headers,
    });
  },
  actualizarData: (endpoint, data, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axiosInstance.put(`${BASE_URL}/${endpoint}/${id}`, data, {
      headers,
    });
  },
  desactivarData: (endpoint, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axiosInstance.put(`${BASE_URL}/${endpoint}/${id}/desactivar`, {
      headers,
    });
  },
  eliminarData: (endpoint, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axiosInstance.delete(`${BASE_URL}/${endpoint}/${id}`, { headers });
  },
};

export default api;
