import React, { Fragment, useEffect, useState } from "react";
import SelectPaises from "../../singles/SelectPaises";
import SelectProvicia from "../../singles/SelectProvincia";
import SelectNumeroBrigada from "../../singles/SelectNumeroBrigada";
import SelectIndicativo from "../../singles/SelectIndicativo";
import SelectPosionAsignada from "../../singles/SelectPosionAsignada";
import calculoDiasFechas from "../../helpers/calculoDiasFechas";
import { Button } from "react-bootstrap";
import { isEmpty } from "lodash";
import AlertError from "../../singles/AlertError";
import validarFechas from "../../helpers/validarFechas";
import AlertExito from "../../singles/AlertExito";
import { ObtenerPosiciones, ObtenerProvincias } from "../../services/catalogs/CatalogoService";
import { postBrigadesCandidatesInsert } from "../../services/manifest/ManifestService";

const FormAsignarBrigada = ({ state, setState, setShow, setReload }) => {
  const [posiciones, setPosiciones] = useState();
  const [provincias, setProvincias] = useState();

  const setInfo = (input) => {
    setState({
      ...state,
      [input.target.name]: input.target.value.toUpperCase(),
    });
  };

  const setInfo2 = (input) => {
    setState({
        ...state,
        [input.target.name]: input.target.value
    })
}

  useEffect(() => {

    ObtenerPosiciones().then(async ({ data: { data } }) => {
      await setPosiciones(data);
    });

    ObtenerProvincias().then(async ({ data: { data } }) => {
      await setProvincias(data);
    });

    return () => { }

  }, []);

  const onSubmit = () => {
    const keys = Object.keys(state);
    if (
      (state.asignado === "1" && keys.length < 9) ||
      (state.asignado === "0" && keys.length < 3)
    ) {
      AlertError(
        "Campos vacios",
        "Debe de ingresar todos los campos necesarios"
      );
      return;
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (isEmpty(state[keys[i]])) {
          AlertError(
            "Campo vacio",
            "Revisar que todos los campos no esten llenos."
          );
          return;
        }
      }
      if (
        state.asignado === "1" &&
        !validarFechas(state.fechaInicio, state.fechaFinal)
      ) {
        AlertError(
          "Fechas Incorrectas",
          "La fecha conclusión debe ser mayor a la fecha incial."
        );
      } else {
        postBrigadesCandidatesInsert({ data: state }).then((resp) => {
          if (resp.status === 200) {
            AlertExito("Asignado", "Candidato asignado Correctamente.");
            setShow(false);
            setReload(true);
          }
        });
      }
    }
  };

  return (
    <Fragment>
      <div className="row body_wrap pb-4">
        <div className="col-6 col-md-6">
          <label className="control-label">Asignado:</label>
          <select
            name="asignado"
            className={`form-control ${state.asignado ? state.asignado : "myInput"
              }`}
            onChange={setInfo}
            value={state.asignado ? state.asignado : ""}
          >
            <option value="">--Seleccione--</option>
            <option value="1">SI</option>
            <option value="0">NO</option>
          </select>
        </div>
        {state.asignado === "0" &&
          <div className="col-6 col-md-6">
            <label className="control-label">Observación:</label>
            <input
              className={`form-control ${state.referancia ? null : "myInput"}`}
              name="referencia"
              defaultValue={state.referencia}
              value={state.referencia ? state.referencia : ""}
              onChange={setInfo}
              minLength={0}
              maxLength={255}
              type="text"
              placeholder="Ingrese el motivo por el cual no fue asignado"
            />
          </div>
        }
        {state.asignado === "1" && (
          <Fragment>
            <div className="col-6 col-md-6">
              <label className="control-label">Pais:</label>
              <SelectPaises
                className={`form-control ${state.idPais ? null : "myInput"}`}
                name="idPais"
                defaultValue={state.idPais}
                onChange={setInfo}
                onBlur={setInfo}
              />
            </div>
            <div className="col-6 col-md-6">
              <label className="control-label">Región/Provincia/Estado:</label>
              {provincias && (
                <SelectProvicia
                  className={`form-control ${state.idProvincia ? null : "myInput"
                    }`}
                  name="idProvincia"
                  defaultValue={state.idProvincia}
                  onChange={setInfo}
                  onBlur={setInfo}
                  data={provincias}
                  filter={state.idPais}
                />
              )}
            </div>
            <div className="col-3 col-md-3">
              <label className="control-label">Numero de Brigada:</label>
              <SelectNumeroBrigada
                className={`form-control ${state.numero ? null : "myInput"}`}
                name="numero"
                onChange={setInfo}
                value={state.numero}
                numero={20}
              />
            </div>
            <div className="col-3 col-md-3" >
              <label className="control-label">Asignación de Brigada:</label>
              <input
                className={`form-control ${state.asignacion ? null : "myInput"
                  }`}
                name="asignacion"
                defaultValue={state.asignacion}
                value={state.asignacion ? state.asignacion : ""}
                onChange={setInfo}
                minLength={0}
                maxLength={255}
                pattern="(^MX-\d{3},\s{1}[A-Z]{1,2}-\d{3}$)"
                type="text"
                placeholder="Ingrese el nombre clave de la brigada a asignar"
              />
              <small className="text-danger fs-5">Ejemplo: (MX-001, C-361)</small>
            </div>
            <div className="col-6 col-md-6">
              <label className="control-label">
                Posición Asignada (GMF):
              </label>
              {posiciones && (
                <SelectPosionAsignada
                  className={`form-control ${state.idPosicion ? null : "myInput"
                    }`}
                  name="idPosicion"
                  defaultValue={state.idPosicion}
                  onChange={setInfo}
                  onBlur={setInfo}
                  data={posiciones}
                  filter={state.idPais}
                />
              )}
            </div>
            <div className="col-3 col-md-3">
              <label className="control-label">Indicativo:</label>
              <SelectIndicativo
                className={`form-control ${state.indicativo ? null : "myInput"}`}
                name="indicativo"
                onChange={setInfo2}
                value={state.indicativo}
                indicativo={'t'}
              />
            </div>
            <div className="row col-12">
              <div className="col-4 col-md-4">
                <label className="control-label">
                  Fecha de Inicio:
                </label>
                <input
                  className={`form-control ${state.fechaInicio ? null : "myInput"
                    }`}
                  name="fechaInicio"
                  defaultValue={state.fechaInicio}
                  onChange={setInfo}
                  type="date"
                />
              </div>
              <div className="col-4 col-md-4">
                <label className="control-label">
                  Fecha de conclusión:
                </label>
                <input
                  className={`form-control ${state.fechaFinal ? null : "myInput"
                    }`}
                  name="fechaFinal"
                  defaultValue={state.fechaFinal}
                  onChange={setInfo}
                  type="date"
                />
              </div>
              <div className="col-4 col-md-4">
                <label className="control-label">Dias de Operacion:</label>
                <input
                  className={`form-control ${state.fechaFinal ? null : "myInput"
                    }`}
                  name="fechaFinal"
                  value={
                    state.fechaFinal && state.fechaInicio
                      ? calculoDiasFechas(state.fechaFinal, state.fechaInicio)
                      : ""
                  }
                  disabled={true}
                  type="number"
                />
              </div>
            </div>
          </Fragment>
        )}
      </div>

      <div className="m-0 vh-0 row justify-content-center align-items-center">
        <Button className="btn btn-info" onClick={() => onSubmit()}>
          Registrar
        </Button>
      </div>
    </Fragment>
  );
};

export default FormAsignarBrigada;
