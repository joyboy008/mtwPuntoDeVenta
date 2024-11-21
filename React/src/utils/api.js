import axios from "axios";
import { BASE_URL } from "./constants";
import authProvider from "./AuthProvider";

const api = {
  login: (credentials) => {
    return axios.post(`${BASE_URL}/auth/login`, credentials);
  },
  crearData: (endpoint, data) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.post(`${BASE_URL}/${endpoint}/`, data, {
      headers,
    });
  },
  getData: (endpoint, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/${endpoint}/${id}`, { headers });
  },
  listarData: (endpoint) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/${endpoint}/`, {
      headers,
    });
  },
  actualizarData: (endpoint, data, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.put(`${BASE_URL}/${endpoint}/${id}`, data, {
      headers,
    });
  },
  desactivarData: (endpoint, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.put(`${BASE_URL}/${endpoint}/${id}/desactivar`, {
      headers,
    });
  },
  eliminarData: (endpoint, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.delete(`${BASE_URL}/${endpoint}/${id}`, { headers });
  },
};

export default api;
