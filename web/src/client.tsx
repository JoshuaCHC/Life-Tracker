import axios from "axios";

export const client = axios.create({baseURL: "http://localhost:5272/api/"});
