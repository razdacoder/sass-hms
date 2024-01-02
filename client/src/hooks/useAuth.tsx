import { verifyAuth } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

export default function useAuth() {
  const { setIsAuthenticaed } = useAuthStore();
  const { mutate, status } = useMutation({
    mutationFn: verifyAuth,
    onSuccess() {
      setIsAuthenticaed(true);
    },
    onError() {
      setIsAuthenticaed(false);
    },
  });

  return { mutate, status };
}
