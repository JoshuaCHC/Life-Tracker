import axios from "axios";
import Cookies from "universal-cookie";



// optionaly add base url
export const client = axios.create({baseURL: "http://acme.com/api/"});

// const request = ({ ...options }) => {
//     const cookie = new Cookies()
//     client.defaults.headers.common.Authorization = `Bearer ${cookie.get('access_token')}`;

//     return client(options);
// }

// export default request;