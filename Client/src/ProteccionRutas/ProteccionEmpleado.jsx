import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProteccionEmpleado = () => {
  const userState = useSelector((state) => state.empleados.empleado);

  return (userState.empleado_id && userState.Role?.nombre === "empleado") ||
    userState.Role?.nombre === "admin" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
};

export default ProteccionEmpleado;
