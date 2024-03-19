import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { allCurriculos } from "../../redux/curriculoSlice";

import { Title } from "../UI";

export function Postulaciones() {
  const curriculos = useSelector((state) => state.curriculos);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);

    axios
      .get("http://localhost:3001/tthh/curriculos")
      .then(({ data }) => dispatch(allCurriculos(data)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Postulaciones</Title>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-[40%] sm:max-w-sm">
        {curriculos.curriculos?.map((curriculo, i) => (
          <div key={i}>
            <p>{curriculo.grado_instruccion}</p>
            <p>{curriculo.titulo_obtenido}</p>
            <p>{curriculo.centro_educativo}</p>
            <p>{curriculo.area_interes_otro}</p>
            <p>{curriculo.disponibilidad_viajar}</p>
            <p>{curriculo.disponibilidad_cambio_residencia}</p>
            <p>{curriculo.ruta_pdf}</p>
            <p>{curriculo.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
