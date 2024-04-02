import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const userState = useSelector((state) => state.empleados.empleado);

  return userState.empleado_id ? <Outlet /> : <Navigate replace to="/" />;
};

export default AuthGuard;
