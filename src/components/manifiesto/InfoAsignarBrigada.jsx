import React, { Fragment, useEffect, useState } from "react";
import SelectPaises from "../../singles/SelectPaises";
import SelectProvicia from "../../singles/SelectProvincia";
import SelectNumeroBrigada from "../../singles/SelectNumeroBrigada";
import SelectPosionAsignada from "../../singles/SelectPosionAsignada";
import calculoDiasFechas from "../../helpers/calculoDiasFechas";
import axiosClient from "../../config/axios";
import AlertCargando from "../../singles/AlertCargando";
import AlertExito from "../../singles/AlertExito";

const InfoAsignarBrigada = ({ state, setState }) => {
  const [posiciones, setPosiciones] = useState();
  const [provincias, setProvincias] = useState();
  const [data, setData] = useState({
    idCandidato: state.idCandidato,
  });

  const [cargarInfo, setCargarInfo] = useState(true);

  useEffect(() => {
    if (cargarInfo) {
      AlertCargando("Cargando información...");
      axiosClient({
        method: "post",
        url: `${process.env.REACT_APP_BACKEN_URL}list_posiciones`,
      }).then(async ({ data: { data } }) => {
        await setPosiciones(data);
      });

      axiosClient({
        method: "post",
        url: `${process.env.REACT_APP_BACKEN_URL}list_provincias`,
      }).then(async ({ data: { data } }) => {
        await setProvincias(data);
      });

      axiosClient({
        method: "post",
        url: `${process.env.REACT_APP_BACKEN_URL}selectCandidatoBrigada`,
        data: { idCandidato: data.idCandidato },
      }).then(async ({ data: { data } }) => {
        await setData(data[0]);
        AlertExito("Información cargada con éxito");
      });
      setCargarInfo(false);
    }
  }, [data, cargarInfo]);

  return (
    <Fragment>
      <div className="row body_wrap pb-4">
        <div className="col-6 col-md-6">
          <label className="control-label">Asignado:</label>
          <select
            name="asignado"
            className={`form-control ${
              data.asignado ? data.asignado : "myInput"
            }`}
            value={data.asignado}
            disabled={true}
          >
            <option value="">--Seleccione--</option>
            <option value="1">SI</option>
            <option value="0">NO</option>
          </select>
        </div>

        <div className="col-6 col-md-6">
          <label className="control-label">Referencia:</label>
          <input
            className={`form-control ${
              data.referancia ? data.referencia : "myInput"
            }`}
            name="referencia"
            defaultValue={data.referencia ? data.referencia : ""}
            minLength={0}
            maxLength={200}
            placeholder="Ingrese el nombre de la brigada a asignar"
            disabled={true}
          />
        </div>

        <div className="col-6 col-md-6">
          <label className="control-label">Pais:</label>
          <SelectPaises
            className={`form-control ${data.idPais ? data.idPais : "myInput"}`}
            name="idPais"
            value={data.idPais ? data.idPais : ""}
            disabled={true}
          />
        </div>
        <div className="col-6 col-md-6">
          <label className="control-label">Providencia/Estado:</label>
          {provincias && (
            <SelectProvicia
              className={`form-control ${
                data.idProvincia ? data.idProvincia : "myInput"
              }`}
              name="idProvincia"
              value={data.idProvincia ? data.idProvincia : ""}
              filter={data.idPais}
              disabled={true}
              data={provincias}
            />
          )}
        </div>
        <div className="col-6 col-md-6">
          <label className="control-label">Numero de Brigada:</label>
          <SelectNumeroBrigada
            className={`form-control ${data.numero ? null : "myInput"}`}
            name="numero"
            value={data.numero ? data.numero : ""}
            numero={20}
            disabled={true}
          />
        </div>

        <div className="col-6 col-md-6">
          <label className="control-label">Asignación de Brigada:</label>
          <input
            className={`form-control ${data.asignacion ? null : "myInput"}`}
            name="asignacion"
            defaultValue={data.asignacion ? data.asignacion : ""}
            minLength={0}
            maxLength={20}
            type="text"
            disabled={true}
            placeholder="Ingrese el nombre de la brigada a asignar"
          />
        </div>

        <div className="col-6 col-md-6">
          <label className="control-label">Posición Asignada por la GMF:</label>
          {posiciones && (
            <SelectPosionAsignada
              className={`form-control ${data.idPosicion ? null : "myInput"}`}
              name="idPosicion"
              value={data.idPosicion ? data.idPosicion : ""}
              disabled={true}
              filter={data.idPais}
              data={posiciones}
            />
          )}
        </div>
        <div className="col-4 col-md-4">
          <label className="control-label">Fecha de incio de asignación:</label>
          <input
            className={`form-control ${data.fechaInicio ? null : "myInput"}`}
            name="fechaInicio"
            defaultValue={data.fechaInicio}
            disabled={true}
            type="date"
          />
        </div>
        <div className="col-4 col-md-4">
          <label className="control-label">
            Fecha de conclusión de asignación:
          </label>
          <input
            className={`form-control ${data.fechaFinal ? null : "myInput"}`}
            name="fechaFinal"
            defaultValue={data.fechaFinal}
            disabled={true}
            type="date"
          />
        </div>
        <div className="col-4 col-md-4">
          <label className="control-label">Dias de Operacion:</label>
          <input
            className={`form-control ${data.fechaFinal ? null : "myInput"}`}
            name="fechaFinal"
            value={
              data.fechaFinal && data.fechaInicio
                ? calculoDiasFechas(data.fechaFinal, data.fechaInicio)
                : ""
            }
            disabled={true}
            type="number"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default InfoAsignarBrigada;
