import { api } from "../../config/axios";
import { publicApi } from "../../config/axiosPublic";

export const tokenIsValid = async () => {
  try {
    const response = await api.get("/v1/core/auth/");

    if (response.status === 200) return true;

    return false;
  } catch (error) {
    return null;
  }
};

export const login = async (identification, password) => {
  try {
    const response = await publicApi.post("/v1/core/users/login", {
      identification,
      password,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
