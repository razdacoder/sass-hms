import { register } from "@/services/authService";
import { RegisterType } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const navigate = useNavigate();
  const { mutate, status } = useMutation({
    mutationFn: (data: RegisterType) => register(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/activate/${data.activation_token}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, status };
}
