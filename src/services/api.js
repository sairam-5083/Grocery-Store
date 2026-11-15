import axios from "axios";

const API = axios.create({
  baseURL: "https://grocery-backend-xxlx.onrender.com/",
});

export default API;