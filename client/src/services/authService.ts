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

export { register };
