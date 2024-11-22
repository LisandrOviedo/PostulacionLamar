import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProteccionActualizarClave() {
  const userState = useSelector((state) => state.empleados.empleado);

  return userState.empleado_id ? <Outlet /> : <Navigate replace to="/" />;
}
