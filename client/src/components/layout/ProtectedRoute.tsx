// import { useUser } from "../features/authentication/useUser";
import useAuth from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/spinner";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticaed } = useAuthStore();
  const { mutate, status } = useAuth();

  useEffect(() => {
    mutate();
  }, []);

  if (status === "pending") {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (!isAuthenticaed) {
    return navigate("/login");
  }

  return children;
}

export default ProtectedRoute;
