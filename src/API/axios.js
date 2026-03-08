import axios from "axios";

const api = axios.create({
  baseURL: "https://bookstore.eraasoft.pro/api",
});

export default api;