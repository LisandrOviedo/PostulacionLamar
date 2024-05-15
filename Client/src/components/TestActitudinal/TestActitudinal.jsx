import { clsx } from "clsx";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { getPrueba } from "../../redux/pruebaKostick/pruebaAction";

import { Button, Input, Label, Select, Title } from "../UI";

import Swal from "sweetalert2";
import { prueba } from "../../redux/pruebaKostick/pruebaSlice";

export function TestActitudinal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const prueba_kostick = useSelector(
    (state) => state.prueba_kostick.prueba_kostick
  );

  const [prueba, setPrueba] = useState({});

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getPrueba(token));

    document.title = "Grupo Lamar - Aplicar Test Actitudinal";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white">
      <Title>Aplicar Test Actitudinal</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />
      <div className="grid gap-10 grid-cols-1 md:grid-cols-3 mt-5 mb-5">
        {prueba_kostick.map((respuestas, index) => (
          <div key={index + 1} className="flex flex-col gap-4">
            <label htmlFor={index + 1} className="font-bold">
              Pregunta número {index + 1}
            </label>
            {respuestas.map((respuesta) => (
              <div key={respuesta.respuesta_id} className="flex gap-2">
                <input
                  type="radio"
                  value={respuesta.respuesta}
                  id={respuesta.respuesta_id}
                  name={respuesta.numero_pregunta}
                />
                <label htmlFor={respuesta.respuesta_id}>
                  {respuesta.respuesta}
                </label>
              </div>
            ))}
          </div>
        ))}

        <div className="md:col-span-3 flex justify-center items-center">
          <Button className="m-0 w-auto">Terminar Test</Button>
        </div>
      </div>
    </div>
  );
}
