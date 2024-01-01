import { activate } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useActivation() {
  const navigate = useNavigate();
  const { mutate, status } = useMutation({
    mutationFn: (data: { activation_code: string; activation_token: string }) =>
      activate(data),
    onSuccess: () => {
      toast.success("Account activated successfully");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, status };
}
