import axios, { Axios } from "axios";
import cookies from 'js-cookie';

export const getContentType = () => ({
  "Content-Type": "application/json",
});

export const API_URL = `http://localhost:3001/api`;

export const axiosClassic = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});

const instance = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});

instance.interceptors.request.use((config) => {
  const accessToken = cookies.get("token");

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default instance;
