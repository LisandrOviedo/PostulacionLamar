import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProteccionAdmin = () => {
  const userState = useSelector((state) => state.empleados.empleado);

  return userState.empleado_id && userState.Role?.nombre === "admin" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/admin/acceso" />
  );
};

export default ProteccionAdmin;
