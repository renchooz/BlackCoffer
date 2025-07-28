import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", 
});

export const getData = (params) => API.get("/data", { params });
