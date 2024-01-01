import { RegisterType } from "@/types/authTypes";
import api from "./apiServices";

const register = async (data: RegisterType) => {
  try {
    const response = await api.post("auth/users/", data);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const activate = async (data: {
  activation_code: string;
  activation_token: string;
}) => {
  try {
    const response = await api.post("auth/users/activate/", data);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("auth/users/login/", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const resetPassword = async (data: { email: string }) => {
  try {
    const response = await api.post("auth/users/reset-password/", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export { activate, login, register, resetPassword };
