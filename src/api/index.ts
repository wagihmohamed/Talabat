import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL || 'http://13.51.235.128:3000/'

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
