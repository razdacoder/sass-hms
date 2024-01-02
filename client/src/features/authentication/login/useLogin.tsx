import { getCurrentUser, login } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUser";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const { setIsAuthenticaed } = useAuthStore();
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { mutate, status } = useMutation({
    mutationFn: (data: { email: string; password: string }) => login(data),
    onSuccess: async () => {
      toast.success("Login successfully");
      setIsAuthenticaed(true);
      const user = await getCurrentUser();
      setUser(user);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  return { mutate, status };
}
