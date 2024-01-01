import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
