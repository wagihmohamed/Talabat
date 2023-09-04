import axios from "axios";
// const baseURL ='http://13.51.235.128:3000/'
const baseURL = 'https://talabatek.net/'

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem('token');

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
