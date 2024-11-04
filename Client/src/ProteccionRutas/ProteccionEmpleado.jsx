import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProteccionEmpleado = () => {
  const userState = useSelector((state) => state.empleados.empleado);

  const location = useLocation();

  const { pathname } = location;

  const menuPermiso = userState?.Role?.Menus?.some(
    (element) => element.ruta === pathname
  );

  return userState.empleado_id &&
    userState.Role.nombre &&
    (menuPermiso || pathname === "/perfilProfesional/registro") ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" state={{ from: location }} />
  );
};

export default ProteccionEmpleado;
