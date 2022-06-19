import React, { useState, useEffect, useContext } from "react";
import ExS190 from "./ExS190";
import AlertaSiguiente from "../../singles/AlertaSiguiente";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import AlertError from "../../singles/AlertError";
import moment from "moment";
/* CONTEXT */
import candidatoContext from "../../context/candidato/candidatoContext";
import SelectSiNo from "../../singles/SelectSiNo";
import GenerarEstados from "../../singles/GenerarEstados";
import GenerarPaises from "../../singles/GenerarPaises";
import { size } from "lodash";
import { formatDate } from "../../helpers/formatDate";
import { validarExtPdf } from "../../helpers/validarExtPDF";
import ExamenS190 from "../examenes/examen_s190/ExamenS190";

const S5 = (props) => {
  const { state, setState, checkData, setStateFiles, files } = props;
  const [isCompleteExam, setIsCompleteExam] = useState(false);
  const [preguntas_s_190, setPreguntas_s_190] = useState(false);

  const setInfo = (input) => {
    if (input.target.name === "s_190" || input.target.name === "s_130") {
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

  const setNumero = (input) => {
    if (size(input.target.value) < 2 && input.target.value >= 0) {
      setState({
        ...state,
        [input.target.name]: input.target.value,
      });
    }
  };

  return (
    <div className="row body_wrap">
      {/* Cargar Constancia de Curso S-190 */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Cargar Constancia de Curso S-190/CPCIF
        </label>
        <input
          className="form-control myInput"
          name="s_190"
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          onBlur={() => {
            setPreguntas_s_190(files.s_190_fl && files.s_130_fl ? true : false);
          }}
          onMouseLeave={() => {
            setPreguntas_s_190(files.s_190_fl && files.s_130_fl ? true : false);
          }}
          placeholder="Ingrese S-190..."
        />
      </div>

      {/* Cargar Constancia de Curso S-130 */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Cargar Constancia de Curso S-130/CPCIF
        </label>
        <input
          className="form-control myInput"
          name="s_130"
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          onBlur={() => {
            setPreguntas_s_190(files.s_190_fl && files.s_130_fl ? true : false);
          }}
          onMouseLeave={() => {
            setPreguntas_s_190(files.s_190_fl && files.s_130_fl ? true : false);
          }}
          placeholder="Ingrese S-130..."
        />
      </div>

      {preguntas_s_190 && (
        <React.Fragment>
          {/* ¿Participó como miembro de una brigada nacional el presente año? */}
          <div className="col-6">
            <label className="control-label pt-2">
              ¿Participó como miembro de una brigada nacional el presente año?
              <SelectSiNo
                className="form-control myInput"
                name="tiene_part_brig_nac"
                value={state.tiene_part_brig_nac}
                onChange={setInfo}
                onBlur={setInfo}
              />
            </label>
          </div>

          {state.tiene_part_brig_nac === "1" && (
            <div className="col-6">
              <React.Fragment>
                <label className="control-label pt-2">
                  ¿A cuantos estados Participo como miembro de brigada?
                  <input
                    className="form-control myInput"
                    type="number"
                    value={state.num_est_part ? state.num_est_part : ""}
                    name="num_est_part"
                    onChange={setNumero}
                    placeholder="Ingresa el numero de estados"
                  />
                </label>
              </React.Fragment>
            </div>
          )}

          {state.num_est_part > 0 && state.tiene_part_brig_nac === "1" && (
            <React.Fragment>
              <GenerarEstados
                titulo={"¿A que estado (s) participo como miembro de brigada?"}
                name="estados_part_brig"
                state={state}
                setState={setState}
                cantEstados={state.num_est_part}
              />
            </React.Fragment>
          )}

          {/*¿Participó en las movilizaciones nacionales el presente  año?  */}
          <div className="col-6">
            <label className="control-label pt-2">
              ¿Participó en las movilizaciones nacionales el presente año?
              <SelectSiNo
                className="form-control myInput"
                name="tiene_part_mov_nac"
                value={state.tiene_part_mov_nac}
                onChange={setInfo}
                onBlur={setInfo}
              />
            </label>
          </div>
          <div className="col-6">
            {state.tiene_part_mov_nac === "1" && (
              <React.Fragment>
                <label className="control-label pt-2">
                  ¿A cuantos estados fue movilizado?
                  <input
                    className="form-control myInput"
                    type="number"
                    name="num_est_mov"
                    value={state.num_est_mov ? state.num_est_mov : ""}
                    onChange={setNumero}
                    placeholder="Ingresa el numero de estados"
                  />
                </label>
              </React.Fragment>
            )}
          </div>

          {state.num_est_mov > 0 && state.tiene_part_mov_nac === "1" && (
            <React.Fragment>
              <GenerarEstados
                titulo={"¿A qué estado (s) fue movilizado (a)?"}
                name="estados_mov_part"
                state={state}
                setState={setState}
                cantEstados={state.num_est_mov}
              />
            </React.Fragment>
          )}

          {/*¿Ha sido asignado (a) como recurso en incendios forestales en otro país? */}
          <div className="col-7">
            <label className="control-label pt-2">
              ¿Ha sido asignado (a) como recurso en incendios forestales en otro
              país?
              <SelectSiNo
                className="form-control myInput"
                name="tiene_asig_recurso_pais"
                value={state.tiene_asig_recurso_pais}
                onChange={setInfo}
                onBlur={setInfo}
              />
            </label>
          </div>
          <div className="col-5">
            {state.tiene_asig_recurso_pais === "1" && (
              <React.Fragment>
                <label className="control-label pt-2">
                  ¿A cuantos paises fue asignado?
                  <input
                    className="form-control myInput"
                    type="number"
                    name="num_pais_asig"
                    value={state.num_pais_asig ? state.num_pais_asig : ""}
                    onChange={setNumero}
                    placeholder="Ingresa el numero de estados"
                  />
                </label>
              </React.Fragment>
            )}
          </div>

          {state.num_pais_asig > 0 && state.tiene_asig_recurso_pais === "1" && (
            <React.Fragment>
              <GenerarPaises
                name="paises_asig_recurso"
                state={state}
                setState={setState}
                cantPaises={state.num_pais_asig}
              />
            </React.Fragment>
          )}

          <div className="col-12">
            <label className="control-label pt-2">
              ¿Cuántas veces ha sido asignado como recurso nacional en incendios
              forestales en una entidad federativa distinta a su base?
            </label>
            <input
              className="form-control myInput"
              name="asignado_recurso_nacional"
              type="number"
              value={state.asignado_recurso_nacional}
              onChange={setInfo}
              placeholder="¿Cuántas veces ha sido asignado como recurso nacional en incendios forestales..."
            />
          </div>
        </React.Fragment>
      )}

      {/* BTN SCI/SMI 100 */}
      <div className="col-12 pt-5 btn-margin">
        <ExamenS190
          hidden={
            files.s_130_fl &&
            files.s_190_fl &&
            state.asignado_recurso_nacional &&
            !isCompleteExam
              ? false
              : true
          }
          setIsCompleteExam={setIsCompleteExam}
          state={state}
          setState={setState}
        />
      </div>

      {/* BTN Continuar */}
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

export default S5;
