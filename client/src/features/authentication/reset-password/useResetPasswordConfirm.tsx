import { resetPasswordConfirm } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useResetPasswordConfirm() {
  const navigate = useNavigate();
  const { mutate, status } = useMutation({
    mutationFn: (data: {
      new_password: string;
      re_new_password: string;
      token: string;
    }) => resetPasswordConfirm(data),
    onSuccess: () => {
      toast.success("Password reset successfully");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, status };
}
