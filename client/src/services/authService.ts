import { RegisterType } from "@/types/authTypes";
import api from "./apiServices";

const register = async (data: RegisterType) => {
  const response = await api.post("auth/users/", data);
  return response.data;
};

const activate = async (data: {
  activation_code: string;
  activation_token: string;
}) => {
  const response = await api.post("auth/users/activate/", data);
  return response.data;
};

const login = async (data: { email: string; password: string }) => {
  const response = await api.post("auth/users/login/", data);
  return response.data;
};

const resetPassword = async (data: { email: string }) => {
  const response = await api.post("auth/users/reset-password/", data);
  return response.data;
};

const resetPasswordConfirm = async (data: {
  new_password: string;
  re_new_password: string;
  token: string;
}) => {
  const response = await api.post("auth/users/confirm-reset-password/", data);
  return response.data;
};

const verifyAuth = async () => {
  const response = await api.post("auth/users/verify/");
  return response.data;
};

const refreshToken = async () => {
  const response = await api.post("auth/users/refresh/");
  return response.data;
};

const logout = async () => {
  const response = await api.post("auth/users/logout/");
  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("auth/users/me/");
  return response.data;
};

export {
  activate,
  getCurrentUser,
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
  resetPasswordConfirm,
  verifyAuth,
};
