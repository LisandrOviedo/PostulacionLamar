import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProteccionAdmin = () => {
  const userState = useSelector((state) => state.empleados.empleado);

  const location = useLocation();

  const { pathname } = location;

  const menuPermiso = userState?.Role?.Menus?.some(
    (element) => element.ruta === pathname
  );

  return userState.empleado_id && userState.Role.acceso_admin && menuPermiso ? (
    <Outlet />
  ) : (
    <Navigate replace to="/admin/acceso" state={{ from: location }} />
  );
};

export default ProteccionAdmin;
