import axios from "axios";
import Cookies from "universal-cookie";


const client = axios.create({baseURL: "http://acme.com/api/" });
client.interceptors.request.use(
  (config) => {
    const cookie = new Cookies()
    const token = cookie.get('access_token')
    console.log(token)
    const auth = token ? `Bearer ${token}` : '';
    config.headers.Authorization = auth;
    return config;
  },
  (error) => Promise.reject(error),
);

export default client