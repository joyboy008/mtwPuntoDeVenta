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
      authProvider.deleteSession();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

const buildAuthHeaders = () => ({
  ...authProvider.getAuthHeaders(),
  "Content-Type": "application/json",
});

const api = {
  // -------------------------------------------------------------------------
  // Auth
  // -------------------------------------------------------------------------
  login: (credentials) => {
    return axiosInstance.post("/auth/login", credentials);
  },

  // -------------------------------------------------------------------------
  // CRUD genérico
  // -------------------------------------------------------------------------
  crearData: (endpoint, data) => {
    return axiosInstance.post(`/${endpoint}/`, data, {
      headers: buildAuthHeaders(),
    });
  },

  getData: (endpoint, id) => {
    return axiosInstance.get(`/${endpoint}/${id}`, {
      headers: buildAuthHeaders(),
    });
  },

  listarData: (endpoint, params = {}) => {
    return axiosInstance.get(`/${endpoint}/`, {
      headers: buildAuthHeaders(),
      params,
    });
  },

  listarDataEspecial: (endpoint, params = {}) => {
    return axiosInstance.get(`/${endpoint}/`, {
      headers: buildAuthHeaders(),
      params,
      paramsSerializer: (params) => {
        return params.status.map((s) => `status=${s}`).join("&");
      },
    });
  },

  actualizarData: (endpoint, id, data) => {
    console.log(data);
    return axiosInstance.put(`/${endpoint}/${id}`, data, {
      headers: buildAuthHeaders(),
    });
  },

  patchData: (endpoint, id, data) => {
    return axiosInstance.patch(`/${endpoint}/${id}`, data, {
      headers: buildAuthHeaders(),
    });
  },

  eliminarData: (endpoint, id) => {
    return axiosInstance.delete(`/${endpoint}/${id}`, {
      headers: buildAuthHeaders(),
    });
  },

  // -------------------------------------------------------------------------
  // Público — sin autenticación (landing page)
  // -------------------------------------------------------------------------
  crearDataPublic: (endpoint, data) => {
    return axiosInstance.post(`/${endpoint}/`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  // -------------------------------------------------------------------------
  // Citas
  // -------------------------------------------------------------------------
  listarCitas: (status = null) => {
    const params = status ? { status } : {};
    return axiosInstance.get("/appointments/", {
      headers: buildAuthHeaders(),
      params,
    });
  },

  getCitasPorFecha: (date) => {
    return axiosInstance.get("/appointments/by-date", {
      headers: buildAuthHeaders(),
      params: { date },
    });
  },

  cambiarStatusCita: (id, status) => {
    return axiosInstance.patch(
      `/appointments/${id}/status`,
      { status },
      {
        headers: buildAuthHeaders(),
      },
    );
  },

  // -------------------------------------------------------------------------
  // Cotizaciones
  // -------------------------------------------------------------------------
  getCotizacionPorCita: (appointmentId) => {
    return axiosInstance.get(`/quotations/appointment/${appointmentId}`, {
      headers: buildAuthHeaders(),
    });
  },

  buscarCatalogo: (q) => {
    return axiosInstance.get("/catalog/search", {
      headers: buildAuthHeaders(),
      params: { q },
    });
  },
};

//

export default api;
