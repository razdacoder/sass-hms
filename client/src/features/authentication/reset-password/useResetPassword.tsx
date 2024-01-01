import { resetPassword } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useResetPassword() {
  const { mutate, status } = useMutation({
    mutationFn: (data: { email: string }) => resetPassword(data),
    onSuccess: () => {
      toast.success("Password reset link sent");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, status };
}
