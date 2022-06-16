import React, { useEffect, useState } from "react";
import SelectSiNo from "../../singles/SelectSiNo";
import AlertaSiguiente from "../../singles/AlertaSiguiente";
import diferenciaFechasDias from "../../helpers/diferenciaFechaDias";
import { formatDate } from "../../helpers/formatDate";
import AlertError from "../../singles/AlertError";
import { validarExtPdf } from "../../helpers/validarExtPDF";
import { size } from 'lodash';
import { ObtenerEquipo } from "../../services/catalogs/CatalogoService";

const S7 = (props) => {
  const { state, setState, checkData, setStateFiles, files } = props;
  const [data, setData] = useState(null);
  const [timeout, setTimeout] = useState(0);

  useEffect(() => {

    revisarValidaciones();

    setTimeout(() => {
      ObtenerEquipo().then(async (response) => {
        if (response.status === 200) {
          setData(response.data.data);
        }
      });
    }, 2000);

    return () => { clearTimeout(timeout) }

  }, [state.rechazo])

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
      setState({
        ...state,
        [input.target.name]: input.target.value,
      });
    }
  };

  const setNumero = (input) => {

    if (size(input.target.value) <= 2 && input.target.value >= 0 && input.target.value <= 10) {

      setState({
        ...state,
        [input.target.name]: input.target.value,
      });

    }
  };

  const revisarValidaciones = () => {

    const { tiene_epp_completo, antecedentes_fecha } = state;
    const { evaluacion_disponibilidad_fl } = files;
    const dif_antecedentes = diferenciaFechasDias(antecedentes_fecha);

    if (dif_antecedentes > 31 * 2) {

      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "carta de antecedentes mayor a 2 meses",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });

    } else if (tiene_epp_completo === "0") {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "no cuenta con equipo completo",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });
    } else if (!evaluacion_disponibilidad_fl) {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "no cuenta con constancia de disponibilidad",
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
  }


  return (
    <div className="row body_wrap">

      {/* Evaluación de disponibilidad por parte del Centro de Trabajo. */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Evaluación de disponibilidad por parte del Centro de Trabajo.
        </label>
        <input
          className="form-control myInput"
          name="evaluacion_disponibilidad"
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          onBlur={revisarValidaciones}
          placeholder="Carga la evaluación de disponibilidad"
        />
      </div>

      {/* Calificación de la evaluación de disponibilidad*/}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Calificación de Evaluación de Disponibilidad
        </label>
        <input
          className="form-control myInput"
          type="number"
          value={state.calificacion_evaluacion_disponibilidad ? state.calificacion_evaluacion_disponibilidad : ''}
          name="calificacion_evaluacion_disponibilidad"
          onChange={setNumero}
          onBlur={revisarValidaciones}
          placeholder="Ingresa la calificación obtenida en la evaluación"
        />
      </div>
      {/* Carta de no antecedentes penales */}

      {files?.evaluacion_disponibilidad_fl
        && state.calificacion_evaluacion_disponibilidad
        && <React.Fragment>
          <div className="col-12 col-md-6">
            <label className="control-label pt-2">
              Carta de no antecedentes penales
            </label>
            <input
              className="form-control myInput"
              name="carta_antecedentes"
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              onBlur={revisarValidaciones}
              placeholder="Carga la Carta de no antecedentes penales"
            />
          </div>

          {/* Fecha de expedición de la carta de antecedentes no penales */}
          <div className="col-12 col-md-6">
            <label className="control-label pt-2">
              Fecha de expedición de la carta de antecedentes no penales
            </label>
            <input
              className="form-control myInput"
              name="antecedentes_fecha"
              value={state.antecedentes_fecha}
              type="date"
              onChange={setInfo}
              onBlur={revisarValidaciones}
              placeholder="Fecha de expedición de la carta de antecedentes no penales"
            />
          </div>

          {/* Cuenta con EPP completo */}
          <div className="col-12 col-md-12">
            <label className="control-label pt-2">
              <h5> ¿Cuenta con el siguiente equipo de despliegue completo?</h5>
              <ul>
                {data && data.map((item) => (
                  <li key={item.id}>
                    <b>{item.nombre}</b> ({item.descripcion})
                  </li>
                ))}
              </ul>

              <SelectSiNo
                className="form-control myInput"
                name="tiene_epp_completo"
                onBlur={revisarValidaciones}
                value={state.tiene_epp_completo}
                onChange={setInfo}
              />
            </label>
          </div>
        </React.Fragment>}

      {/* BTN Continuar */}
      <div className="col-12 pt-5 btn-margin">
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

export default S7;
