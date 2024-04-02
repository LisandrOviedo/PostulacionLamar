import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuardAdmin = () => {
  const userState = useSelector((state) => state.empleados.empleado);

  return userState.empleado_id && userState.rol === "admin" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/admin/login" />
  );
};

export default AuthGuardAdmin;
