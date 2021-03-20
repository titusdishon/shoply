import axios from "axios";
import { SERVER_API_URL,AUTH_TOKEN } from './constants'

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = () => {
  const onRequestSuccess = (config) => {
    const token = localStorage.getItem(AUTH_TOKEN);
        if (token) {
            config.headers.Authorization = `${token}`;
            config.headers.ContentType = `'content-type': 'multipart/form-data'`
        }
        return config;
  };
  axios.interceptors.request.use(onRequestSuccess);
};

export default setupAxiosInterceptors;
