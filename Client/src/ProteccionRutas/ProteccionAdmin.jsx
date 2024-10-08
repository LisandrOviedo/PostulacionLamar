import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProteccionAdmin = () => {
  const userState = useSelector((state) => state.empleados.empleado);

  const location = useLocation();

  return userState.empleado_id && userState.Role.nombre !== "empleado" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/admin/acceso" state={{ from: location }} />
  );
};

export default ProteccionAdmin;
