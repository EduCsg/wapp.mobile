import axios from "axios";
import { getFromCache } from "../src/utils/SecureStore";
import { CACHE_KEYS } from "../src/constants/Cache";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      // TODO: redirect to login screen and clear cache
      switch (err.response.status) {
        case 401:
          console.log("Sessão expirada, faça login novamente!");
          break;
        case 403:
          console.log("Você não tem permissão para acessar este recurso!");
          break;
        case 500:
          console.log("Desculpe, ocorreu um erro inesperado!");
          break;
      }
    }
    return Promise.reject(err);
  }
);

api.interceptors.request.use(
  async (config) => {
    const token = await getFromCache(CACHE_KEYS.TOKEN);

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
