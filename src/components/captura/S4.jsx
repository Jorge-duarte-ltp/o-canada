import React, { useState } from "react";
import SelectSiNo from "../../singles/SelectSiNo";

import AlertaSiguiente from "../../singles/AlertaSiguiente";

import AlertError from "../../singles/AlertError";

/* CONTEXT */
import { validarExtPdf } from "../../helpers/validarExtPDF";
import ExamenSCI100 from "../examenes/examen_sci100/ExamenSCI100";

const S4 = (props) => {
 
  const { state, setState, checkData, files, setStateFiles } = props;
  const [isCompleteExam, setIsCompleteExam] = useState(false);
  const [preguntas_smi_100, setPreguntas_smi_100] = useState(false);

  const setInfo = (input) => {
    if (input.target.type === "file") {
      setStateFiles({
        ...files,
        [input.target.name + "_fl"]: validarExtPdf(
          input.target.files[0].name,
          input.target.accept
        )
          ? input.target.files
          : AlertError(
              "Error:",
              `El archivo con la extensión no esta permitido .${input.target.files[0].name
                .split(".")
                .pop()}`
            ),
        [input.target.name]: input.target.value,
      });
    } else {
      /* setea al state las variables */
      setState({
        ...state,
        [input.target.name]: input.target.value,
      });
    }
  };

  return (
    <div className="row body_wrap">
      {/* Cargar constancia del Curso SCI/SMI 100 */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">
          Cargar constancia del Curso SCI/SMI 100
        </label>
        <input
          className="form-control myInput"
          name="sci_smi_100"
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          onBlur={() => {
            setPreguntas_smi_100(
              files.sci_smi_100_fl && files.sci_smi_200_fl ? true : false
            );
          }}
          onMouseLeave={() => {
            setPreguntas_smi_100(
              files.sci_smi_100_fl && files.sci_smi_200_fl ? true : false
            );
          }}
          placeholder="Ingrese SCI/SMI 100..."
        />
      </div>

      {/* Cargar constancia del Curso SCI/SMI 200 */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">
          Cargar constancia del Curso SCI/SMI 200
        </label>
        <input
          className="form-control myInput"
          name="sci_smi_200"
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          onBlur={() => {
            setPreguntas_smi_100(
              files.sci_smi_100_fl && files.sci_smi_200_fl ? true : false
            );
          }}
          onMouseLeave={() => {
            setPreguntas_smi_100(
              files.sci_smi_100_fl && files.sci_smi_200_fl ? true : false
            );
          }}
          placeholder="Ingrese SCI/SMI 200..."
        />
      </div>

      {/* Cargar constancia del Curso SCI/SMI 300 */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">
          Cargar constancia del Curso SCI/SMI 300
        </label>
        <input
          className="form-control myInput"
          name="sci_smi_300"
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          placeholder="Ingrese SCI/SMI 300..."
        />
      </div>

      {preguntas_smi_100 && (
        <React.Fragment>
          {/* ¿El evaluado ha participado en eventos planeados o no...? */}
          <div className="col-12">
            <label className="control-label danger pt-2">
              ¿El evaluado ha participado en eventos planeados o no planeados
              atendidos bajo el SCI?
            </label>
            <SelectSiNo
              className="form-control myInput"
              name="eventos_plnaeados_sci"
              onChange={setInfo}
              value={
                state.eventos_plnaeados_sci ? state.eventos_plnaeados_sci : ""
              }
            />
          </div>

          {/* ¿El evaluado ha participado en eventos planeados o no planeados...? */}
          <div className="col-12">
            <label className="control-label danger pt-2">
              ¿El evaluado ha participado en eventos planeados o no planeados
              atendidos bajo el SCI fuera de su país?
            </label>
            <SelectSiNo
              className="form-control myInput"
              name="eventos_plnaeados_sci_fuera"
              onChange={setInfo}
              value={
                state.eventos_plnaeados_sci_fuera
                  ? state.eventos_plnaeados_sci_fuera
                  : ""
              }
            />
          </div>

          {/* ¿El evaluado ha ocupado en eventos planeados o no estructura...? */}
          <div className="col-12">
            <label className="control-label danger pt-2">
              ¿El evaluado ha ocupado en eventos planeados o no planeados alguna
              posición dentro de la estructura del SCI?
            </label>
            <SelectSiNo
              className="form-control myInput"
              name="eventos_plnaeados_dentro_estructura"
              onChange={setInfo}
              value={
                state.eventos_plnaeados_dentro_estructura
                  ? state.eventos_plnaeados_dentro_estructura
                  : ""
              }
            />
          </div>

          {/* Indique cual Posición */}
          {state.eventos_plnaeados_dentro_estructura === "1" && (
            <React.Fragment>
              <div className="col-5">
                <label className="control-label pt-2">
                  Indique cual Posición
                </label>
                <input
                  className="form-control myInput"
                  name="sci_cual"
                  type="text"
                  onChange={setInfo}
                  placeholder="Indique cual posición..."
                  value={state.sci_cual ? state.sci_cual : ""}
                />
              </div>
            </React.Fragment>
          )}

          {/* ¿El evaluado pertenece a algún Equipo de Manejo de Incidentes? */}
          <div className="col-7">
            <label className="control-label danger pt-2">
              ¿El evaluado pertenece a algún Equipo de Manejo de Incidentes?
            </label>
            <SelectSiNo
              className="form-control myInput"
              name="evaluado_menejo_incidentes"
              onChange={setInfo}
              value={
                state.evaluado_menejo_incidentes
                  ? state.evaluado_menejo_incidentes
                  : ""
              }
            />
          </div>
        </React.Fragment>
      )}

      {/* BTN SCI/SMI 100 */}
      <div className="col-12 pt-5 btn-margin">
        <ExamenSCI100
          hidden={
            files.sci_smi_100_fl &&
            files.sci_smi_200_fl &&
            state.eventos_plnaeados_sci &&
            state.eventos_plnaeados_sci_fuera &&
            state.eventos_plnaeados_dentro_estructura &&
            state.evaluado_menejo_incidentes &&
            !isCompleteExam
              ? false
              : true
          }
          setIsCompleteExam={setIsCompleteExam}
          state={state}
          setState={setState}
        />
      </div>

      <div className="col-12 pt-5 btn-margin">
        <button
          disabled={!isCompleteExam}
          className="btn btn-primary"
          onClick={() =>
            AlertaSiguiente(
              "Si continúa, no será posible volver a esta seccion",
              checkData
            )
          }
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default S4;
