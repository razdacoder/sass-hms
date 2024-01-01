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
    const response = await api.post("auth/users/login/", data);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const resetPassword = async (data: { email: string }) => {
  try {
    const response = await api.post("auth/users/reset-password/", data);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const resetPasswordConfirm = async (data: {
  new_password: string;
  re_new_password: string;
  token: string;
}) => {
  try {
    const response = await api.post("auth/users/confirm-reset-password/", data);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export { activate, login, register, resetPassword, resetPasswordConfirm };
