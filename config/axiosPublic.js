import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const publicApi = axios.create({
  baseURL,
});

publicApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 500:
          console.log("Desculpe, ocorreu um erro inesperado!");
          break;
      }
    }
    return Promise.reject(err);
  }
);
