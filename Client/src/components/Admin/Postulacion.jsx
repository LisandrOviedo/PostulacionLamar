import { useEffect } from "react";

import { Button, Title } from "../UI";

export function Postulacion() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="mt-24 sm:mt-32 h-full flex flex-col px-5 sm:px-10 bg-white static">
      <Title>Postulación</Title>
      <hr className="w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto" />
      <Button className="m-0 w-auto">Continuar</Button>
    </div>
  );
}
