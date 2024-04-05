import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuardEmpleado = () => {
  const userState = useSelector((state) => state.empleados.empleado);

  return (userState.empleado_id && userState.rol === "empleado") ||
    userState.rol === "admin" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
};

export default AuthGuardEmpleado;
