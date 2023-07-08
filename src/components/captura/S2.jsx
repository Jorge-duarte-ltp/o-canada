import React from "react";
import AlertaSiguiente from "../../singles/AlertaSiguiente";
import diferenciaFechasMeses from "../../helpers/diferenciaFechasMeses";
// import diferenciaFechasDias from "../../helpers/diferenciaFechaDias";
import SelectSiNo from "../../singles/SelectSiNo";
import ToMayus from "../../helpers/ToMayus";
import { formatDate } from "../../helpers/formatDate";
import { validarExtPdf } from "../../helpers/validarExtPDF";
import AlertError from "../../singles/AlertError";

const S2 = (props) => {
  const { state, setState, checkData, files, setStateFiles } = props;
  // const [checkFiles, setCheckFiles] = useState({});

  const setInfo = (input) => {
    /* setea al state las variables */
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
        [input.target.name]: input.target.value.toUpperCase(),
      });
    }
  };

  const setVencimiento = (input) => {
    const date = input.target.value.toUpperCase();
    setState({
      ...state,
      visa_usa_fecha_cad: formatDate(date, 10),
    });
  };

  const revisarFormulario = () => {
    const { pasaporte_fecha_cad, eta_visa_fecha_cad, antecedentes_fecha } =
      state;

    /* VALIDACIONES:
            si antecedentes_fecha > 2 meses
            si pasaporte_fecha_cad < 10 meses
            si eta_visa_fecha_exp < 10 meses
        */
    const dif_antecedentes = diferenciaFechasMeses(antecedentes_fecha);
    const dif_pasaporte = diferenciaFechasMeses(pasaporte_fecha_cad);
    const dif_eta_visa = diferenciaFechasMeses(eta_visa_fecha_cad);

    // Carta es menor a 2 meses
    if (dif_antecedentes > 2) {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "carta de antecedentes mayor a 2 meses",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });
    } else {
      // Pasaporte vence dentro de 10 meses
      if (dif_pasaporte > -10) {
        setState({
          ...state,
          rechazo: true,
          motivo_rechazo: "pasaporte vence en menos de 10 meses",
          fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
        });
      } else {
        // eta/Visa vence dentro de 10 meses
        if (dif_eta_visa > -10) {
          setState({
            ...state,
            rechazo: true,
            motivo_rechazo: "eta/visa vence en menos de 10 meses",
            fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
          });
        } else {
          /* Si todo Bien */
          setState({
            ...state,
            rechazo: false,
            motivo_rechazo: null,
            fechaCreacion: null,
          });
        }
      }
    }
  };

  return (
    <div className="row body_wrap">
      {/* Pasaporte */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">Pasaporte</label>
        <input
          className="form-control myInput"
          name="pasaporte_archivo"
          // value={state.pasaporte_archivo}
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          placeholder="Pasaporte"
        />
      </div>

      {/* Pasaporte No. */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">No. de Pasaporte</label>
        <input
          className="form-control myInput"
          name="pasaporte_numero"
          value={state.pasaporte_numero ? state.pasaporte_numero : ""}
          onChange={setInfo}
          onChangeCapture={ToMayus}
          placeholder="No. de Pasaporte..."
        />
      </div>

      {/* Fecha de vencimiento del pasaporte */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">
          Fecha de vencimiento del pasaporte
        </label>
        <input
          className="form-control myInput"
          name="pasaporte_fecha_cad"
          value={state.pasaporte_fecha_cad ? state.pasaporte_fecha_cad : ""}
          type="date"
          onBlur={revisarFormulario}
          onChange={setInfo}
          placeholder="Fecha de vencimiento del pasaporte"
        />
      </div>

      {/* ETA/Visa */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">VISA/Correo Oficial de Cánada con la ETA</label>
        <input
          className="form-control myInput"
          name="eta_visa_archivo"
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          placeholder="Ingrese ETA/Visa"
        />
      </div>

      {/* Documento para viajar a Canadá */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Documento para viajar a Canadá
        </label>
        <select
          className="form-control myInput"
          name="documento_viajar_canada"
          value={state.documento_viajar_canada}
          onChange={setInfo}
          placeholder="Documento para viajar a Canadá"
        >
          <option value="">--Seleccione--</option>
          <option value="VISA">VISA</option>
          <option value="ETA">Correo Oficial de Canadá con la ETA</option>
        </select>
      </div>

      <div className="col-12 col-md-6">
        <label className="control-label pt-2">ETA/Visa No.</label>
        <input
          className="form-control myInput"
          name="eta_visa_num"
          value={state.eta_visa_num ? state.eta_visa_num : ""}
          onChangeCapture={ToMayus}
          onChange={setInfo}
          placeholder="Ingrese ETA/Visa No..."
        />
      </div>

      {/* ETA/Visa F. expedición */}

      <div className="col-12 col-md-3">
        <label className="control-label pt-2">
          ETA/Visa Fecha de expedición
        </label>
        <input
          className="form-control myInput"
          name="eta_visa_fecha_exp"
          value={state.eta_visa_fecha_exp ? state.eta_visa_fecha_exp : ""}
          type="date"
          onBlur={revisarFormulario}
          onChange={setInfo}
          placeholder="ETA/Visa Fecha de expedición"
        />
      </div>

      {/* ETA/Visa F. vencimiento */}

      <div className="col-12 col-md-3">
        <label className="control-label pt-2">
          ETA/Visa Fecha de vencimiento
        </label>
        <input
          className="form-control myInput"
          name="eta_visa_fecha_cad"
          value={state.eta_visa_fecha_cad ? state.eta_visa_fecha_cad : ""}
          type="date"
          onBlur={revisarFormulario}
          onChange={setInfo}
          placeholder="Ingrese ETA/Visa F. vencimiento..."
        />
      </div>
      {/* ¿Cuenta con visa estadounidense vigente? */}
      <div className="col-12 col-md-12">
        <label>¿Cuenta con visa estadounidense vigente?</label>
        <SelectSiNo
          className="form-control myInput"
          name="tiene_visa_usa"
          value={state.tiene_visa_usa ? state.tiene_visa_usa : ""}
          onChange={setInfo}
        />
      </div>

      {/* Si Cuenta con Visa Americana debera mostrar las siguientes opciones  */}
      {state.tiene_visa_usa === "1" && (
        <React.Fragment>
          {/* Documento para viajar a Estados Unidos */}
          <div className="col-12 col-md-6">
            <label className="control-label pt-2">Visa estadounidense</label>
            <input
              className="form-control myInput"
              name="visa_usa_archivo"
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              placeholder="Ingrese Visa Estadounidense"
            />
          </div>

          {/* VISA USA Numero */}
          <div className="col-12 col-md-6">
            <label className="control-label pt-2">
              No. Visa estadounidense
            </label>
            <input
              className="form-control myInput"
              name="visa_usa_num"
              value={state.visa_usa_num ? state.visa_usa_num : ""}
              defaultValue={state.visa_usa_num}
              onChangeCapture={ToMayus}
              onChange={setInfo}
              placeholder="Ingrese la visa estadounidense"
            />
          </div>

          {/* VISA USA F. expedición */}
          <div className="col-12 col-md-6">
            <label className="control-label pt-2">
              Fecha de expedición - Visa estadounidense
            </label>
            <input
              className="form-control myInput"
              name="visa_usa_fecha_exp"
              defaultValue={state.visa_usa_fecha_exp}
              type="date"
              onBlur={setInfo}
              onChange={setVencimiento}
              placeholder="Visa USA Fecha de expedición"
            />
          </div>

          {/* Visa USA F. vencimiento */}

          <div className="col-12 col-md-6">
            <label className="control-label pt-2">
              Fecha de vencimiento - Visa Estadounidense
            </label>
            <input
              className="form-control myInput"
              name="visa_usa_fecha_cad"
              value={state.visa_usa_fecha_cad ? state.visa_usa_fecha_cad : ""}
              defaultValue={state.visa_usa_fecha_cad}
              type="date"
              onChange={setInfo}
              placeholder="Ingrese Visa Estadounidense F. vencimiento..."
            />
          </div>
        </React.Fragment>
      )}

      {/* TIENE LICENCIA DE MANEJO */}
      <div className="col-12 col-md-12">
        <label>¿Cuenta con Licencia de Manejo de Chofer?</label>
        <SelectSiNo
          className="form-control myInput"
          name="tiene_licencia"
          value={state.tiene_licencia ? state.tiene_licencia : ""}
          onChange={setInfo}
        />
      </div>

      {state.tiene_licencia === "1" && (
        <React.Fragment>
          {/* Licencia de manejo de chofer */}
          <div className="col-12 col-md-4">
            <label className="control-label pt-2">
              Licencia de manejo de chofer
            </label>
            <input
              className="form-control myInput"
              name="licencia_manejo"
              value={state.licencia_manejo}
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              placeholder="Ingrese Licencia de manejo de chofer..."
            />
          </div>

          {/* Tipo de licencia de manejo de chofer */}
          <div className="col-12 col-md-4">
            <label className="control-label pt-2">
              Tipo de licencia de manejo de chofer
            </label>
            <select
              className="form-control myInput"
              name="tipo_licencia"
              value={state.tipo_licencia ? state.tipo_licencia : ""}
              onChange={setInfo}
              placeholder="Tipo de licencia de manejo de chofer"
            >
              <option value="">---Seleccione---</option>
              <option value="NACIONAL">Nacional de chofer</option>
              <option value="NACIONAL TRADUCIDA">Nacional traducida</option>
              <option value="INTERNACIONAL">Internacional</option>
            </select>
          </div>

          {/* Fecha vencimiento licencia */}
          <div className="col-12 col-md-4">
            <label className="control-label pt-2">
              Fecha de vencimiento de la licencia
            </label>
            <input
              className="form-control myInput"
              name="licencia_fecha_cad"
              value={state.licencia_fecha_cad}
              type="date"
              onBlur={revisarFormulario}
              onChange={setInfo}
              placeholder="Fecha de vencimiento de la licencia"
            />
          </div>
        </React.Fragment>
      )}

      {/* BTN Continuar */}
      <div className="col-12 pt-5 btn-margin">
        <button
          // disable={(checkPassaport) ? true : false}
          className="btn btn-primary"
          onClick={() =>
            AlertaSiguiente(
              "Si continúa, no será posible volver a esta seccion",
              checkData
            )
          }
        // onClick={revisarFormulario}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default S2;
