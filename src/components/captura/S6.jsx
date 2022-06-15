import React, { useEffect, useState } from "react";
import AlertaSiguiente from "../../singles/AlertaSiguiente";
import SelectSiNo from "../../singles/SelectSiNo";
import { size } from "lodash";
import { formatDate } from "../../helpers/formatDate";
import { validarExtPdf } from "../../helpers/validarExtPDF";
import AlertError from "../../singles/AlertError";
import ExamenOSEP from "../examenes/equipo_aereo/ExamenOSEP";

const S6 = (props) => {

  const { state, setState, checkData, setStateFiles, files } = props;

  useEffect(() => {
    window.onbeforeunload = false;
    revisionCompetencias();
  }, [state.examen_equipo_aereo]);

  const setInfo = (input) => {
    /* setea al state las variables */
    if (input.target.name === "doc_acred_primeros_auxilios" || input.target.name === "constancia_operaciones_aereas") {
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
      setState({
        ...state,
        [input.target.name]: input.target.value,
      });
    }
  };

  const setAnio = (input) => {
    if (input.target.name === "anio_opero_moto") {
      if (size(input.target.value) < 5) {
        setState({
          ...state,
          [input.target.name]: input.target.value,
        });
      }
    }
  };

  const revisionCompetencias = () => {
    if (
      state.opera_autonoma_gps === "0"
    ) {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "falta de habilidad o competencia",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });
    } else if (state.opera_autonoma_mark3 === "0") {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "falta de habilidad o competencia",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });
    } else {
      setState({
        ...state,
        rechazo: false,
        motivo_rechazo: null,
        fechaCreacion: null,
      });
    }
  };

  return (
    <div className="row body_wrap">
      {/* Opera de manera autónoma GPS */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          ¿Opera de manera autónoma GPS?
        </label>
        <SelectSiNo
          className="form-control myInput"
          name="opera_autonoma_gps"
          onBlur={revisionCompetencias}
          value={state.opera_autonoma_gps}
          onChange={setInfo}
        />
      </div>

      {/* Opera de manera autónoma Bomba Mark 3 */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          ¿Opera de manera autónoma Bomba Mark 3?
        </label>
        <SelectSiNo
          className="form-control myInput"
          name="opera_autonoma_mark3"
          onBlur={revisionCompetencias}
          value={state.opera_autonoma_mark3}
          onChange={setInfo}
        />
      </div>

      {/* Opera de manera autónoma Motosierra */}
      <div className="col-4 col-md-6">
        <label className="control-label pt-2">
          ¿Opera de manera autónoma la Motosierra?
        </label>
        <SelectSiNo
          className="form-control myInput"
          name="opera_autonoma_motosierra"
          onBlur={revisionCompetencias}
          value={state.opera_autonoma_motosierra}
          onChange={setInfo}
        />
      </div>

      {/* ¿Ha ocupado la posición de Operador de Motosierra en alguna brigada? */}
      {state.opera_autonoma_motosierra === "1" && (
        <React.Fragment>
          <div className="col-6 col-md-6">
            <label className="control-label pt-2">
              ¿Ha ocupado la posición de Operador de Motosierra en alguna
              brigada?
            </label>
            <SelectSiNo
              className="form-control myInput"
              name="posicion_operador_moto_briga"
              onBlur={revisionCompetencias}
              value={state.posicion_operador_moto_briga}
              onChange={setInfo}
            />
          </div>
        </React.Fragment>
      )}
      {state.posicion_operador_moto_briga === "1" && (
        <React.Fragment>
          <div className="col-12 col-md-6">
            {/*  ¿En qué país? */}
            <label className="control-label pt-2">
              ¿En qué país?
              <select
                className="form-control myInput"
                name="pais_opero_moto"
                onChange={setInfo}
                onBlur={setInfo}
                value={state.pais_opero_moto ? state.pais_opero_moto : ""}
              >
                <option value="">---Seleccione---</option>
                <option value={0}>México</option>
                <option value={1}>Estados Unidos</option>
              </select>
            </label>
          </div>
          <div className="col-12 col-md-6">
            {/*  ¿En qué año? */}
            <label className="control-label pt-2">
              ¿En qué año?
              <input
                className="form-control myInput"
                name="anio_opero_moto"
                onChange={setAnio}
                onBlur={setAnio}
                type="number"
                value={state.anio_opero_moto ? state.anio_opero_moto : ""}
              />
            </label>
          </div>
        </React.Fragment>
      )}

      {/* ¿cuenta con certificado de primeros auxilios? */}
      <div className="col-12 col-md-8">
        <label className="control-label pt-2">
          ¿Cuenta con certificado de primeros auxilios?
        </label>
        <SelectSiNo
          className="form-control myInput"
          name="conocimientos_primeros_auxilios"
          value={state.conocimientos_primeros_auxilios}
          onChange={setInfo}
        />
      </div>

      {/* Cuenta con conocimientos de primero auxilios */}
      <div className="col-12 col-md-4">
        {state.conocimientos_primeros_auxilios === "1" && (
          <React.Fragment>
            <label className="control-label pt-2">Nivel:</label>
            <select
              className="form-control myInput"
              name="niv_primeros_auxilios"
              value={state.niv_primeros_auxilios}
              onChange={setInfo}
            >
              <option>---Seleccione---</option>
              <option value="basico">Básico</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </React.Fragment>
        )}
      </div>

      {/* ARCHIVO ACREDITACION */}
      <div className="col-12 col-md-12">
        {state.conocimientos_primeros_auxilios === "1" && (
          <React.Fragment>
            <label className="control-label pt-2">
              Documento de acreditación
            </label>
            <input
              className="form-control myInput"
              type="file"
              accept="application/pdf"
              name="doc_acred_primeros_auxilios"
              onChange={setInfo}
            />
          </React.Fragment>
        )}
      </div>
      {/** ¿Cuenta con concimientos básicos en operaciones Seguras en equipo aéreo? */}
      <div className="col-12 col-md-4">
        <React.Fragment>
          <label className="control-label pt-2">¿Cuenta con conocimientos básicos en Operaciones Seguras en equipo aéreo?</label>
          <SelectSiNo
            className="form-control myInput"
            name="conocimiento_equipo_aereo"
            value={state.conocimiento_equipo_aereo}
            onChange={setInfo}
          />
        </React.Fragment>
      </div>


      {/** Constancia de alumno o instructor en Operaciones (S-217, S-271 Y S-371). */}
      <div className="col-12 col-md-12">
        {state.conocimiento_equipo_aereo === "1" && (
          <React.Fragment>
            <label className="control-label pt-2">
              Constancia de alumno o instructor en Operaciones aéreas (S-217, S-271 y S-371).
            </label>
            <input
              className="form-control myInput"
              type="file"
              accept="application/pdf"
              name="constancia_operaciones_aereas"
              onChange={setInfo}
            />
          </React.Fragment>
        )}
      </div>
      <div className="col-12 col-md-12">
        {state.conocimiento_equipo_aereo && state.examen_equipo_aereo !== "completa" && (
          <ExamenOSEP state={state} setState={setState} />
        )}
      </div>

      {/* BTN Continuar */}
      <div className="col-12 pt-5 btn-margin">
        <button
          className="btn btn-primary"
          disabled={state.examen_equipo_aereo !== "completa"}
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

export default S6;
