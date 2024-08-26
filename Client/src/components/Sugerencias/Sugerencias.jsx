import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import {
  getAllSedesActivas,
  resetSedesActivas,
} from "../../redux/sedes/sedesActions";

import { getAllTiposSugerenciasActivas } from "../../redux/tiposSugerencias/tiposSugerenciasActions";

import {
  getAllSugerenciasPredActivas,
  resetSugerenciasPredActivas,
} from "../../redux/sugerenciasPred/sugerenciasPredActions";

import { postSugerencia } from "../../redux/sugerencias/sugerenciasActions";

import { Button, Hr, Label, Select, TextArea, Title } from "../UI";

import Swal from "sweetalert2";

export function Sugerencias() {
  const dispatch = useDispatch();

  const empresas_activas = useSelector(
    (state) => state.empresas.empresas_activas
  );

  const sedes_activas = useSelector((state) => state.sedes.sedes_activas);

  const tipos_sugerencias_activas = useSelector(
    (state) => state.tipos_sugerencias.tipos_sugerencias_activas
  );

  const sugerencias_pred_activas = useSelector(
    (state) => state.sugerencias_pred.sugerencias_pred_activas
  );

  const URL_INTRANET = import.meta.env.VITE_URL_INTRANET;

  const [sugerencia, setSugerencia] = useState({});

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Buzón de Sugerencias";

    dispatch(getAllEmpresasActivas());
    dispatch(getAllTiposSugerenciasActivas());

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    if (sugerencia.empresa_id && sugerencia.empresa_id !== "Seleccione") {
      setSugerencia({ ...sugerencia, sede_id: "Seleccione" });
      dispatch(getAllSedesActivas(sugerencia.empresa_id));
    } else {
      dispatch(resetSedesActivas());
      setSugerencia({ ...sugerencia, sede_id: "Seleccione" });
    }
  }, [sugerencia.empresa_id]);

  useEffect(() => {
    if (
      sugerencia.tipo_sugerencia_id &&
      sugerencia.tipo_sugerencia_id !== "Seleccione"
    ) {
      setSugerencia({ ...sugerencia, sugerencia_pred_id: "Seleccione" });
      dispatch(getAllSugerenciasPredActivas(sugerencia.tipo_sugerencia_id));
    } else {
      dispatch(resetSugerenciasPredActivas());
      setSugerencia({ ...sugerencia, sugerencia_pred_id: "Seleccione" });
    }
  }, [sugerencia.tipo_sugerencia_id]);

  const handleValidate = (event) => {
    const { name, value } = event.target;

    setSugerencia({ ...sugerencia, [name]: value });
  };

  const handleSendSugerencia = async () => {
    if (
      sugerencia.sede_id &&
      sugerencia.sede_id !== "Seleccione" &&
      sugerencia.sugerencia_pred_id &&
      sugerencia.sugerencia_pred_id !== "Seleccione" &&
      sugerencia.descripcion
    ) {
      dispatch(postSugerencia(sugerencia)).then(() => {
        window.location.href = URL_INTRANET;
      });
    } else {
      Swal.fire({
        title: "Oops...",
        text: "Debes seleccionar una sede, una sugerencia y escribir una descripción detallada de tu sugerencia",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="mt-6 h-full flex flex-col px-5 sm:px-10 bg-white">
      <div className="mx-auto">
        <Link to={URL_INTRANET} className="hover:opacity-70">
          <img src="./LogoAzul.png" alt="Logo Grupo Lamar" className="w-32" />
        </Link>
      </div>
      <Title>Buzón de Sugerencias</Title>
      <br />
      <Hr />
      <br />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 mb-5">
        <div>
          <Label htmlFor="empresa_id">Empresa</Label>

          <Select
            id="empresa_id"
            name="empresa_id"
            defaultValue="Seleccione"
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            {empresas_activas?.length
              ? empresas_activas?.map((empresa, i) => (
                  <option
                    key={i}
                    name={empresa.nombre}
                    value={empresa.empresa_id}
                  >
                    {empresa.nombre}
                  </option>
                ))
              : null}
          </Select>
        </div>

        <div>
          <Label htmlFor="sede_id">Sede</Label>

          <Select
            id="sede_id"
            name="sede_id"
            value={sugerencia.sede_id}
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            {sedes_activas?.length
              ? sedes_activas?.map((sede, i) => (
                  <option key={i} name={sede.nombre} value={sede.sede_id}>
                    {sede.nombre}
                  </option>
                ))
              : null}
          </Select>
        </div>

        <div>
          <Label htmlFor="tipo_sugerencia_id">Tipo de sugerencia</Label>

          <Select
            id="tipo_sugerencia_id"
            name="tipo_sugerencia_id"
            defaultValue="Seleccione"
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            {tipos_sugerencias_activas?.length
              ? tipos_sugerencias_activas?.map((tipo_sugerencia, i) => (
                  <option
                    key={i}
                    name={tipo_sugerencia.descripcion}
                    value={tipo_sugerencia.tipo_sugerencia_id}
                  >
                    {tipo_sugerencia.descripcion}
                  </option>
                ))
              : null}
          </Select>
        </div>

        <div>
          <Label htmlFor="sugerencia_pred_id">Sugerencia</Label>

          <Select
            id="sugerencia_pred_id"
            name="sugerencia_pred_id"
            value={sugerencia.sugerencia_pred_id}
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            {sugerencias_pred_activas?.length
              ? sugerencias_pred_activas?.map((sugerencia_pred, i) => (
                  <option
                    key={i}
                    name={sugerencia_pred.descripcion}
                    value={sugerencia_pred.sugerencia_pred_id}
                  >
                    {sugerencia_pred.descripcion}
                  </option>
                ))
              : null}
          </Select>
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <Label htmlFor="descripcion">
            Descripción detallada de su sugerencia
          </Label>

          <TextArea
            name="descripcion"
            id="descripcion"
            onChange={handleValidate}
            rows="3"
          />
        </div>

        <div className="sm:col-span-2 md:col-span-3 flex flex-col sm:flex-row gap-6 mx-auto">
          <Button className="m-0 w-auto" onClick={handleSendSugerencia}>
            Enviar Sugerencia
          </Button>
          <Button
            className="m-0 w-auto bg-red-500 hover:bg-red-600"
            onClick={() => {
              window.location.href = URL_INTRANET;
            }}
          >
            Salir
          </Button>
        </div>
      </div>
    </div>
  );
}
