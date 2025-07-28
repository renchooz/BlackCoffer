import axios from "axios";


const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export const getData = (params) => API.get("/data", { params });
