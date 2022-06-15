import React from "react";
import AlertaSiguiente from "../../singles/AlertaSiguiente";
import SelectSiNo from "../../singles/SelectSiNo";
import { size } from "lodash";
import { validarExtPdf } from "../../helpers/validarExtPDF";
import AlertError from "../../singles/AlertError";
const S8 = (props) => {
  const { state, setState, checkData, setStateFiles, files } = props;

  const setInfo = (input) => {
    if (
      input.target.name === "examen_toeic_toefl_archivo" ||
      input.target.name === "l_280_file" ||
      input.target.name === "s_290_file" ||
      input.target.name === "s_211_file" ||
      input.target.name === "cert_intern_incendios_file" ||
      input.target.name === "cert_intern_ate_emerg_med_file"
    ) {
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

  const setPuntuacion = (input) => {
    if (size(input.target.value) < 4) {
      setState({
        ...state,
        [input.target.name]: input.target.value,
      });
    }
  };
  return (
    <div className="row body_wrap">
      {/* Posicion Candidato */}
      <div className="col-12 col-md-12">
        <label className="control-label pt-2">
          Posición a la que es candidato:
        </label>
        <select
          className={`form-control myInput`}
          name="posicion_candidato"
          value={state.posicion_candidato}
          disabled={true}
          onChange={setInfo}
          placeholder="Posición a la que es candidato..."
        >
          <option value="">---Seleccione---</option>
          <option value="combatiente">Combatiente</option>
          <option value="jefe_de_cuadrilla">Jefe de Cuadrilla</option>
          <option value="jefe_de_brigada">Jefe de Brigada</option>
          <option value="tecnico">Técnico</option>
        </select>
      </div>
      {state.posicion_candidato === "jefe_de_brigada" ||
      state.posicion_candidato === "tecnico" ? (
        <React.Fragment>
          <div className="col-12 col-md-6">
            {/* Nivel de inglés */}
            <label className="control-label pt-2">Nivel de inglés</label>
            <select
              className="form-control myInput"
              name="nivel_ingles"
              value={state.nivel_ingles}
              onChange={setInfo}
            >
              <option value="">---Seleccione---</option>
              <option value="basico">Básico</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>
          {/*  ¿Cuenta con documento de certificado de Ingles? */}
          <div className="col-6 col-md-6">
            <label className="control-label pt-2">
              ¿Cuenta con documento de certificado de Ingles?
            </label>
            <SelectSiNo
              className="form-control myInput"
              name="tiene_certificado_ingles"
              value={state.tiene_certificado_ingles}
              onChange={setInfo}
            />
          </div>
        </React.Fragment>
      ) : null}
      {state.tiene_certificado_ingles === "1" && (
        <React.Fragment>
          {/* Examen TOEIC/TOEFL */}
          <div className="col-md-4">
            <label className="control-label pt-2">Examen TOEIC/TOEFL</label>
            <input
              className="form-control myInput"
              name="examen_toeic_toefl_archivo"
              value={state.examen_toeic_toefl_archivo_fl}
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              placeholder="Ingrese Examen TOEIC/TOEFL..."
            />
          </div>
          {/* TOEIC/TOEFL */}
          <div className="col-md-4">
            <label className="control-label pt-2">Examen TOEIC/TOEFL</label>
            <select
              className="form-control myInput"
              name="toeic_toefl"
              value={state.toeic_toefl}
              onChange={setInfo}
            >
              <option value="">---Seleccione---</option>
              <option value="toeic">TOEIC</option>
              <option value="toefl">TOEFL</option>
            </select>
          </div>
          {/* Examen TOEIC/TOEFL puntuación */}
          <div className="col-md-4">
            <label className="control-label pt-2">
              Examen TOEIC/TOEFL puntuación
            </label>
            <input
              className="form-control myInput"
              name="examen_toeic_toefl_punt"
              value={state.examen_toeic_toefl_punt}
              type="number"
              onChange={setPuntuacion}
              placeholder="Ingrese Examen TOEIC/TOEFL puntuación..."
            />
          </div>
        </React.Fragment>
      )}
      {/* L-280 */}
      <div className="col-6 col-md-6">
        <label className="control-label pt-2">Cuenta con el curso L-280</label>
        <SelectSiNo
          className="form-control myInput"
          name="l_280"
          value={state.l_280}
          onChange={setInfo}
        />
      </div>

      {/* L-280  Archivo*/}
      <div className="col-6 col-md-6">
        {state.l_280 === "1" && (
          <React.Fragment>
            <label className="control-label pt-2">
              Si la respuesta es sí cargue su constancia
            </label>
            <input
              className="form-control myInput"
              name="l_280_file"
              value={state.l_280_file_fl}
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              placeholder="Ingrese archivo L-280..."
            />
          </React.Fragment>
        )}
      </div>
      {/* S-211 */}
      <div className="col-6 col-md-6">
        <label className="control-label pt-2">Cuenta con el curso S-211</label>
        <SelectSiNo
          className="form-control myInput"
          name="s_211"
          value={state.s_211}
          onChange={setInfo}
        />
      </div>

      {/* S-211  Archivo*/}
      <div className="col-6 col-md-6">
        {state.s_211 === "1" && (
          <React.Fragment>
            <label className="control-label pt-2">
              Si la respuesta es sí cargue su constancia
            </label>
            <input
              className="form-control myInput"
              name="s_211_file"
              value={state.s_211_file_fl}
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              placeholder="Ingrese archivo S-211..."
            />
          </React.Fragment>
        )}
      </div>

      {/* S-290 */}
      <div className="col-6 col-md-6">
        <label className="control-label pt-2">Cuenta con el curso S-290</label>
        <SelectSiNo
          className="form-control myInput"
          name="s_290"
          value={state.s_290}
          onChange={setInfo}
        />
      </div>

      {/* S-290 Archivo*/}
      <div className="col-6 col-md-6">
        {state.s_290 === "1" && (
          <React.Fragment>
            <label className="control-label pt-2">
              Si la respuesta es sí cargue su constancia
            </label>
            <input
              className="form-control myInput"
              name="s_290_file"
              value={state.s_290_file_fl}
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              placeholder="Ingrese archivo S-290..."
            />
          </React.Fragment>
        )}
      </div>

      {/* Certificación internacional de incendios forestales */}
      <div className="col-6 col-md-6">
        <label className="control-label pt-2">
          ¿Cuenta con certificación internacional de incendios forestales?
        </label>
        <SelectSiNo
          className="form-control myInput"
          name="cert_intern_incendios"
          value={state.cert_intern_incendios}
          onChange={setInfo}
        />
      </div>

      {/* Certificación internacional de incendios forestales - Archivo*/}
      <div className="col-6 col-md-6">
        {state.cert_intern_incendios === "1" && (
          <React.Fragment>
            <label className="control-label pt-2">
              Si la respuesta es sí cargue su constancia
            </label>
            <input
              className="form-control myInput"
              name="cert_intern_incendios_file"
              value={state.cert_intern_incendios_file_fl}
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              placeholder="Ingrese archivo..."
            />
          </React.Fragment>
        )}
      </div>
      {/* Certificación internacional en atención de emergencias medicas */}
      <div className="col-6 col-md-6">
        <label className="control-label pt-2">
          ¿Cuenta con certificación internacional en atención de emergencias
          medicas?
        </label>
        <SelectSiNo
          className="form-control myInput"
          name="cert_intern_ate_emerg_med"
          value={state.cert_intern_ate_emerg_med}
          onChange={setInfo}
        />
      </div>

      {/* Certificación internacional en atención de emergencias medicas - Archivo*/}
      <div className="col-6 col-md-6">
        {state.cert_intern_ate_emerg_med === "1" && (
          <React.Fragment>
            <label className="control-label pt-2">
              Si la respuesta es sí cargue su constancia
            </label>
            <input
              className="form-control myInput"
              name="cert_intern_ate_emerg_med_file"
              value={state.cert_intern_ate_emerg_med_file_fl}
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              placeholder="Ingrese archivo..."
            />
          </React.Fragment>
        )}
      </div>

      {/* BTN Continuar */}
      <div className="col-6 pt-5 btn-margin">
        <button
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

export default S8;
