import axios from "axios";

const API = axios.create({
  baseURL: "https://leaddesk-mini-6ufe.onrender.com/api",
});

export default API;