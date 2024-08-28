import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProteccionEmpleado = () => {
  const userState = useSelector((state) => state.empleados.empleado);

  const location = useLocation();

  return userState.empleado_id && userState.Role.nombre ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" state={{ from: location }} />
  );
};

export default ProteccionEmpleado;
