import axios, {AxiosInstance} from 'axios';

const BASE_URL = 'http://localhost:8080';

// Create a default axios instance
const defaultInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default defaultInstance;

// Create an axios instance with additional configurations
export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});
