import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  getPruebaKostick,
  getPruebaKostickEmpleado,
  postPruebaKostick,
} from "../../redux/pruebasKostick/pruebasKostickActions";

import { Button, Hr, Label, Title } from "../UI";

import Swal from "sweetalert2";

import {
  pruebaMenorATresMeses,
  cuandoPuedesAplicar,
} from "../../utils/pruebaKostick";

export default function PruebaKostick() {
  const navigate = useNavigate();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [prueba, setPrueba] = useState({});

  const [pruebaKostick, setPruebaKostick] = useState([]);

  const [mostrarPrueba, setMostrarPrueba] = useState(false);

  const handleAddRespuesta = (event) => {
    const pregunta = event.target.name;
    const respuesta = event.target.value;

    setPrueba({ ...prueba, [pregunta]: respuesta });
  };

  const handleSendTest = () => {
    if (Object.keys(prueba).length < 90) {
      const faltan = 90 - Object.keys(prueba).length;

      Swal.fire({
        title: "Oops...",
        text: `Faltan por responder ${faltan} preguntas`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      postPruebaKostick(token, empleado.empleado_id, prueba).then(() => {
        navigate("/inicio");
      });
    }
  };

  useEffect(() => {
    window.scroll(0, 0);

    getPruebaKostickEmpleado(token, empleado.empleado_id, "Kostick").then(
      async (data) => {
        if (data.length && pruebaMenorATresMeses(data[0].createdAt)) {
          await Swal.fire({
            text: `Ya has aplicado el Test de Valoración Actitudinal, puedes volver a aplicar el día ${cuandoPuedesAplicar(
              data[0].createdAt
            )}`,
            icon: "info",
            showConfirmButton: true,
          });
          navigate("/inicio");
        } else {
          const data = await getPruebaKostick(token);

          setPruebaKostick(data);
          setMostrarPrueba(true);
        }
      }
    );

    document.title = "Grupo Lamar - Aplicar Test Actitudinal";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white">
      <Title>Test Actitudinal</Title>
      <br />
      <Hr />
      <br />
      <p className="text-justify">
        Para el proceso de captación de talentos, hemos seleccionado el Test de
        Kostick para valorar sus potencialidades dentro de nuestra organización,
        por lo que agradecemos leer detenidamente las instrucciones y completar
        el siguiente test.
      </p>
      <br />
      <p className="text-justify">
        Se presentan 90 pares de frases, usted debe elegir de cada par aquella
        que más se asemeje a su forma de ser o de pensar. A veces tendrá la
        impresión de que ninguna frase se asemeja a su manera de ser, o al
        contrario, que ambas lo hacen, en cualquier caso, usted debe optar por
        una de las dos.
      </p>
      <br />
      <p className="text-justify">
        No existe límite de tiempo, sin embargo no se detenga mucho tiempo en
        contestar, sea expontáneo y sincero en sus respuestas.
      </p>
      <br />
      <div className="grid gap-10 md:grid-cols-3 mt-5 mb-5">
        {mostrarPrueba && (
          <>
            {pruebaKostick.map((respuestas, index) => (
              <div key={index + 1} className="flex flex-col gap-4">
                <span
                  className={`font-bold text-center md:text-left ${
                    prueba.hasOwnProperty(index + 1) ? "text-green-400" : null
                  }`}
                >
                  Pregunta número {index + 1}
                </span>
                {respuestas.map((respuesta) => (
                  <div
                    key={respuesta.pregunta_kostick_id}
                    className="flex gap-2"
                  >
                    <input
                      type="radio"
                      id={respuesta.pregunta_kostick_id}
                      name={respuesta.numero_pregunta}
                      value={respuesta.pregunta_kostick_id}
                      onClick={handleAddRespuesta}
                    />
                    <Label htmlFor={respuesta.pregunta_kostick_id}>
                      {respuesta.respuesta}
                    </Label>
                  </div>
                ))}
              </div>
            ))}
            <div className="md:col-span-3 flex justify-center items-center">
              <Button className="m-0 w-auto" onClick={handleSendTest}>
                Terminar Test
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
