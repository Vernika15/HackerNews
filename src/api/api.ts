import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {DEFAULT_API_CONFIG} from './api-config';

export const api = axios.create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error.message);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const { data, status } = error.response
    return Promise.reject(error.message);
  },
);

// export default api;
