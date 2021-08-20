import React, { Fragment, useEffect, useState } from "react";
import SelectPaises from "../../singles/SelectPaises";
import SelectProvicia from "../../singles/SelectProvincia";
import SelectNumeroBrigada from "../../singles/SelectNumeroBrigada";
import SelectPosionAsignada from "../../singles/SelectPosionAsignada";
import calculoDiasFechas from "../../helpers/calculoDiasFechas";
import axiosClient from "../../config/axios";
import AlertCargando from "../../singles/AlertCargando";
import AlertExito from "../../singles/AlertExito";
import { PencilSquare } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import validarFechas from "../../helpers/validarFechas";
import AlertError from "../../singles/AlertError";
import { isEmpty } from "lodash";
const InfoAsignarBrigada = ({ state }) => {
  const [posiciones, setPosiciones] = useState();
  const [provincias, setProvincias] = useState();
  const [edit, setEdit] = useState(false);
  const [reload, setReload] = useState(true);
  const [data, setData] = useState({
    idCandidato: state.idCandidato,
  });

  useEffect(() => {
    if (reload) {
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
      setReload(false);
    }
  }, [data, reload]);

  return edit ? (
    <EditInfo
      setEdit={setEdit}
      data={data}
      posiciones={posiciones}
      provincias={provincias}
      setReload={setReload}
      setState={setData}
    />
  ) : (
    <ViewInfo
      setEdit={setEdit}
      data={data}
      posiciones={posiciones}
      provincias={provincias}
    />
  );
};

const ViewInfo = ({ data, posiciones, provincias, setEdit }) => (
  <Fragment>
    <div className="row body_wrap pb-4">
      <div className="text-center col-1 col-mb-1 p-4">
        <button
          className="btn btn-default ml-auto m-2"
          onClick={() => setEdit(true)}
        >
          <PencilSquare className="text-secondary" />
        </button>
      </div>
      <div className="col-5 col-md-5">
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

const EditInfo = ({
  data,
  setState,
  posiciones,
  provincias,
  setEdit,
  setReload,
}) => {
  const onSubmit = async () => {
    const dataTemp = verifyInfo();
    const keys = await Object.keys(dataTemp);
    if (
      (dataTemp.asignado === "1" && keys.length < 9) ||
      (dataTemp.asignado === "0" && keys.length < 4)
    ) {
      AlertError(
        "Campos vacios",
        "Debe de ingresar todos los campos necesarios"
      );
      return;
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (
          (dataTemp.asignado === "0" && isEmpty(dataTemp[keys[i]])) ||
          (dataTemp.asignado === "1" &&
            isEmpty(dataTemp[keys[i]]) &&
            keys[i] !== "referencia")
        ) {
          AlertError(
            "Campo vacio",
            "Revisar que todos los campos no esten llenos."
          );
          return;
        }
      }
      if (
        dataTemp.asignado === "1" &&
        !validarFechas(dataTemp.fechaInicio, dataTemp.fechaFinal)
      ) {
        AlertError(
          "Fechas Incorrectas",
          "La fecha conclusión debe ser mayor a la fecha incial."
        );
      } else {
        await axiosClient({
          method: "post",
          url: `${process.env.REACT_APP_BACKEN_URL}updateCandidatoBrigada`,
          data: {
            data:
              dataTemp.asignado === "1"
                ? dataTemp
                : {
                    ...dataTemp,
                    numero: null,
                    asignacion: null,
                    idPais: null,
                    idProvincia: null,
                    idPosicion: null,
                    fechaInicio: null,
                    fechaFinal: null,
                  },
          },
        }).then(async (resp) => {
          if (resp.status === 200) {
            AlertExito(
              "Asignado",
              "El Candidato asignado ha sido actualizado Correctamente."
            );
            await setEdit(false);
            await setReload(true);
          }
        });
      }
    }
  };

  const setInfo = (input) => {
    setState({
      ...data,
      [input.target.name]: input.target.value.toUpperCase(),
    });
  };

  const verifyInfo = () => {
    if (data.asignado === "0") {
      return {
        id: data.id,
        idCandidato: data.idCandidato,
        asignado: data.asignado,
        referencia: data.referencia,
      };
    } else {
      return data;
    }
  };

  return (
    <Fragment>
      <div className="row body_wrap pb-4">
        <div className="col-5 col-md-5">
          <label className="control-label">Asignado:</label>
          <select
            name="asignado"
            className={`form-control ${
              data.asignado ? data.asignado : "myInput"
            }`}
            value={data.asignado}
            onChange={setInfo}
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
            value={data.referencia ? data.referencia : ""}
            minLength={0}
            maxLength={200}
            placeholder="Ingrese el nombre de la brigada a asignar"
            onChange={setInfo}
          />
        </div>
        {data.asignado === "1" && (
          <Fragment>
            <div className="col-6 col-md-6">
              <label className="control-label">Pais:</label>
              <SelectPaises
                className={`form-control ${
                  data.idPais ? data.idPais : "myInput"
                }`}
                name="idPais"
                value={data.idPais ? data.idPais : ""}
                onChange={setInfo}
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
                  data={provincias}
                  onChange={setInfo}
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
                onChange={setInfo}
              />
            </div>

            <div className="col-6 col-md-6">
              <label className="control-label">Asignación de Brigada:</label>
              <input
                className={`form-control ${data.asignacion ? null : "myInput"}`}
                name="asignacion"
                minLength={0}
                maxLength={20}
                type="text"
                value={data.asignacion ? data.asignacion : ""}
                onChange={setInfo}
                placeholder="Ingrese el nombre de la brigada a asignar"
              />
            </div>

            <div className="col-6 col-md-6">
              <label className="control-label">
                Posición Asignada por la GMF:
              </label>
              {posiciones && (
                <SelectPosionAsignada
                  className={`form-control ${
                    data.idPosicion ? null : "myInput"
                  }`}
                  name="idPosicion"
                  value={data.idPosicion ? data.idPosicion : ""}
                  filter={data.idPais}
                  data={posiciones}
                  onChange={setInfo}
                />
              )}
            </div>
            <div className="col-4 col-md-4">
              <label className="control-label">
                Fecha de incio de asignación:
              </label>
              <input
                className={`form-control ${
                  data.fechaInicio ? null : "myInput"
                }`}
                name="fechaInicio"
                defaultValue={data.fechaInicio}
                type="date"
                onChange={setInfo}
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
                type="date"
                onChange={setInfo}
              />
            </div>
            <div className="col-4 col-md-4">
              <label className="control-label">Dias de Operacion:</label>
              <input
                className={`form-control ${data.fechaFinal ? null : "myInput"}`}
                name="fechaFinal"
                defaultValue={
                  data.fechaFinal && data.fechaInicio
                    ? calculoDiasFechas(data.fechaFinal, data.fechaInicio)
                    : ""
                }
                disabled={true}
                type="number"
              />
            </div>
          </Fragment>
        )}
      </div>

      <div className="m-0 row justify-content-center align-items-center">
        <Button className="btn btn-danger mr-2" onClick={() => setEdit(false)}>
          Cancelar
        </Button>
        <Button className="btn btn-success" onClick={onSubmit}>
          Actualizar
        </Button>
      </div>
    </Fragment>
  );
};

export default InfoAsignarBrigada;
