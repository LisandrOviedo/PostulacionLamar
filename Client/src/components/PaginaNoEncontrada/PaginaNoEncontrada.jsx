import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PaginaNoEncontrada() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    navigate(-1);
  }, []);

  return <div></div>;
}
