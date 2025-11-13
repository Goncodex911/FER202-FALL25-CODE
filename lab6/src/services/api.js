import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // hoặc URL API thật của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
