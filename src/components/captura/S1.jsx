import React, { useState, useEffect } from "react";
import ToMayus from "../../helpers/ToMayus";
import curpValida from "../../helpers/curpValida";
import InputCURP from "../../singles/InputCURP";
import InputRFC from "../../singles/InputRFC";
import moment from "moment";
import extractInfoCurp from "../../helpers/extractInfoCurp";
import diferenciaFechasAnios from "../../helpers/diferenciaFechasAnios";
import SelectEstados from "../../singles/SelectEstados";
import AlertError from "../../singles/AlertError";
import AlertaSiguiente from "../../singles/AlertaSiguiente";
import emailValid from "../../helpers/emailValid";
import InputNumber from "../../singles/InputNumber";
import SelectAeropuertos from "../../singles/SelectAeropuertos";
import {
  SelectTallas,
  SelectTallasBotas,
  SelectTallasGorras,
  SelectTallasPantalon,
} from "../../singles/SelectTallas";
// import SelectBancos from "../../singles/SelectBancos";
import { ObtenerAeropuertos, ObtenerEstados } from "../../services/catalogs/CatalogoService";
import { formatDate } from "../../helpers/formatDate";
import { validarExtPdf } from "../../helpers/validarExtPDF";
import SelectMunicipio from "../../singles/SelectMunicipio";
import DefaultUserProfile from "../../assets/images/profile/user.png";
// import { Button } from "react-bootstrap";
// import { FileEarmarkPdf } from "react-bootstrap-icons";
// import { checkFilesExist } from "../../services/files/FilesService";
// import GetFilesSection from "../../singles/GetFilesSection";

const S1 = (props) => {
  const { state, setState, checkData, files, setStateFiles } = props;
  const [estados, setEstados] = useState([]);
  const [aeropuertos, setAeropuertos] = useState([]);
  const [preview, setPreview] = useState("");
  const [enter, setEnter] = useState(false);
  const [hideCombatant, sethideCombatant] = useState(false);
  const [hideCuadrilla, sethideCuadrilla] = useState(false);
  const [hideTecnico, sethideTecnico] = useState(false);
  const [, setPuedeContinuar] = useState(false);

  /* validaciones */
  const [correoValido, setCorreoValido] = useState();
  const [correBenefValido, setCorreBenefValido] = useState();
  const [curpCorrecto, setCurpCorrecto] = useState(false);

  // implementación posterior 
  // const [checkFiles, setCheckFiles] = useState({});
  // const [rfcCorrecto, setRfcCorrecto] = useState(false)

  useEffect(() => {

    setPuedeContinuar(
      correoValido && correBenefValido /* && rfcCorrecto */ ? false : true
    );

    ObtenerEstados().then(async (response) => {
      const data = await response.data;
      setEstados(data);
    });

    ObtenerAeropuertos().then(async (response) => {
      if (response.status === 200) {
        setAeropuertos(response.data);
      }
    })

    // checkFilesExist(GetFilesSection("S1", state.curp)).then((response) => {
    //   if (response.status === 200) {
    //     setCheckFiles(response.data);
    //   }
    // })

    typeof state.region === "undefined"
      ? setState({ ...state, region: null })
      : setState({ ...state, region: state.region });

    fillInfoCurp();

    setEnter(true);

  }, [enter]);

  const setInfo = (input) => {
    /* setea al state las variables */
    if (input.target.value < 0) {
      input.target.value = Math.abs(input.target.value);
    }
    if (
      input.target.name === "fotografia" ||
      input.target.name === "curp_archivo"
    ) {
      if (input.target.name === "fotografia") {
        if (input.target.files) {
          setPreview(URL.createObjectURL(input.target.files[0]));
        }
        let filename = input.target.files[0].name;
        setState({
          ...state,
          fotografia: `fotografia.${filename.split(".").pop()}`,
        });
      }
      setStateFiles({
        ...files,
        [input.target.name + "_fl"]: validarExtPdf(
          input.target.files[0].name,
          input.target.accept
        )
          ? input.target.files
          : AlertError(
            "Error:",
            `El archivo ó imagen con la extensión no esta permitido .${input.target.files[0].name
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

  const handleChange = (input) => {

    const object = { region: "", aeropuerto: "" };

    estados.forEach((element) => {
      if (input.target.value === element.cve_ent) {
        object.region = element.region;
        object.aeropuerto = aeropuertos.find(item => element.id === item.idEstado).id;
      }
    });

    setState({ ...state, ...object });

  };

  const checkEdad = (input) => {
    const fecha = input.target.value;
    const fecha_moment = moment(fecha).format("YYYY-MM-DD");
    const anios = diferenciaFechasAnios(fecha_moment);
    /* MENOR DE EDAD */

    if (anios < 21) {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "candidato menor de edad",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });

    } else if (anios > 20) {

      setState({
        ...state,
        rechazo: false,
        motivo_rechazo: null,
        fechaCreacion: null,
      });
      // Edad Combatiente
      if (anios > 50) {
        sethideCombatant(true);
      } else {
        sethideCombatant(false);
      }
      // Edad Jefe Cuadrilla
      if (anios >= 50) {
        sethideCuadrilla(true);
      } else {
        sethideCuadrilla(false);
      }
      // Edad Tecnico/Jefe Brigada
      if (anios >= 60) {
        sethideTecnico(true);
      } else {
        sethideTecnico(false);
      }

    }


  };

  const fillInfoCurp = () => {
    /* Extrae el sexo de la informacion de la CURP*/
    const dataExtracted =
      typeof state.curp != "undefined" ? extractInfoCurp(state.curp) : "";
    setState({
      ...state,
      sexo: dataExtracted.sexo === "H" ? 1 : 2,
      rechazo: false,
      motivo_rechazo: null,
      fechaCreacion: null,
    });
  };

  return (
    <div className="row body_wrap">
      {/* FOTOGRAFIA */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Fotografía digital a color (formato JPG)</label>
        <input
          className={`form-control ${state.fotografia ? "" : "myInput"}`}
          name="fotografia"
          type="file"
          accept="image/jpeg,image/jpg"
          onChange={setInfo}
          placeholder="Ingrese Nombre(s)..."
        />
      </div>
      <div className="col-12 col-md-6 imagen">
        <img src={preview ? preview : DefaultUserProfile} alt="Fotografía" className="d-block rounded m-auto" width={200} height={200} />
      </div>
      {/* Apellido Paterno */}
      <div className="col-6">
        <label className="control-label pt-2">Apellido Paterno</label>
        <input
          className={`form-control "myInput`}
          name="apellido_paterno"
          value={state.apellido_paterno ? state.apellido_paterno : ""}
          onChange={setInfo}
          defaultValue={state.apellido_paterno}
          onChangeCapture={ToMayus}
          placeholder="Ingrese Apellido Paterno..."
        />
      </div>

      {/* Apellido Materno */}
      <div className="col-6">
        <label className="control-label pt-2">Apellido Materno</label>
        <input
          className={`form-control "myInput"`}
          name="apellido_materno"
          value={state.apellido_materno ? state.apellido_materno : ""}
          onChange={setInfo}
          defaultValue={state.apellido_materno}
          onChangeCapture={ToMayus}
          placeholder="Ingrese Apellido Materno..."
        />
      </div>
      {/* Nombre */}
      <div className="col-12">
        <label className="control-label pt-2">Nombre (s)</label>
        <input
          className={`form-control myInput`}
          name="nombres"
          value={state.nombres ? state.nombres : ""}
          onChange={setInfo}
          onChangeCapture={ToMayus}
          defaultValue={state.nombres}
          placeholder="Ingrese Nombre(s)..."
        />
      </div>

      {/* CURP */}
      <div className="col-12 col-md-6" onBlur={fillInfoCurp}>
        <label className="control-label pt-2">CURP</label>
        <InputCURP
          className={`form-control ${state.curp ? "" : "myInput"}`}
          name="curp"
          defaultValue={state.curp}
          onChange={setInfo}
          curp={state.curp}
          onKeyPressCapture={ToMayus}
          onBlur={curpValida}
          placeholder="Ingrese CURP..."
          setCorrect={setCurpCorrecto}
          disabled
        />
      </div>
      {/* CURP File */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">Documento CURP
          {/**checkFiles?.curp_archivo && <a
            href={`${process.env.REACT_APP_BACKEND_FILES}/${state.curp}/curp_archivo.pdf`}
            rel="noopener noreferrer"
            target="_blank" className="ml-5">
            <Button variant="outline-danger" className="text-right m-0" >
              <FileEarmarkPdf />
            </Button>
          </a>*/}
        </label>
        <input
          className={`form-control ${state.curp_archivo ? null : "myInput"}`}
          name="curp_archivo"
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          placeholder="Ingrese Fecha de Nacimiento..."
        />

      </div>

      <div
        className="col-12 col-md-2 pt-4"
        style={{ alignItems: "center", display: "flex" }}
      >
        <a
          className="btn btn-danger py-2 px-4 btnSizeFree"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.gob.mx/curp/"
        >
          Consultar CURP
        </a>
      </div>
      {/* Fecha de Nacimiento */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Fecha de Nacimiento</label>
        <input
          // disabled
          className={`form-control ${state.fecha_nacimiento ? "" : "myInput"}`}
          name="fecha_nacimiento"
          value={state.fecha_nacimiento ? state.fecha_nacimiento : ""}
          type="date"
          onChange={setInfo}
          onBlur={checkEdad}
          placeholder="Ingrese Fecha de Nacimiento..."
        />
      </div>
      {/* RFC */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">RFC</label>
        <InputRFC
          className={`form-control ${state.rfc ? null : "myInput"}`}
          name="rfc"
          defaultValue={state.rfc}
          rfc={state.rfc}
          onKeyPressCapture={ToMayus}
          onChange={setInfo}
          // correct={rfcCorrecto}
          // setCorrect={setRfcCorrecto}
          placeholder="Ingrese RFC..."
        />
      </div>
      {/* Estado */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Estado</label>
        <SelectEstados
          className={`form-control myInput`}
          name="estado"
          value={state.estado ? state.estado : null}
          defaultValue={state.estado}
          onClick={handleChange}
          onChange={setInfo}
          placeholder="Ingrese Estado..."
        />
      </div>

      {/* Region */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Region</label>
        <select
          className={`form-control myInput`}
          name="region"
          value={state.region ? state.region : ""}
          readOnly
          onChange={setInfo}
          placeholder="Ingrese Region..."
          disabled
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Noroeste</option>
          <option value={2}>Norte</option>
          <option value={3}>Noreste</option>
          <option value={4}>Occidente</option>
          <option value={5}>Centro</option>
          <option value={6}>Sureste</option>
        </select>
      </div>

      {/* Municipio */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Municipio</label>
        <SelectMunicipio
          className={`form-control myInput`}
          name="municipio"
          value={state.municipio ? state.municipio : null}
          defaultValue={state.municipio}
          onChange={setInfo}
          placeholder="Ingrese Estado..."
          cve_entidad={state.estado}
        />
      </div>
      {/* Aeropuerto */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Aeropuerto Internacional más cercano a su centro de trabajo
        </label>
        <SelectAeropuertos
          className={`form-control myInput`}
          name="aeropuerto"
          value={state.aeropuerto ? state.aeropuerto : ""}
          readOnly
          onChange={setInfo}
          placeholder="Ingrese Aeropuerto..."
          disabled
        />
      </div>

      {/* Número telefónico para notificaciones */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Número telefónico para notificaciones
        </label>
        <input
          className={`form-control ${state.numero_telefonico_notificaciones ? "" : "myInput"
            }`}
          name="numero_telefonico_notificaciones"
          value={state.numero_telefonico_notificaciones ? state.numero_telefonico_notificaciones : ""}
          maxLength="10"
          onChange={setInfo}
          placeholder="Ingrese Número telefónico para notificaciones..."
        />
      </div>

      {/* Correo electrónico */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Correo electrónico</label>
        <input
          className={`form-control ${state.correo_electronico ? null : "myInput"
            }`}
          name="correo_electronico"
          value={state.correo_electronico ? state.correo_electronico : ""}
          type="email"
          onBlur={(input) => {
            if (input.target.value) {
              setCorreoValido(emailValid(input.target.value));
            }
          }}
          onChange={setInfo}
          placeholder="Ingrese Correo electrónico..."
        />
        {correoValido === false && (
          <div className="col-sm-12">
            <small className="text-danger">El correo no es valido.</small>
          </div>
        )}
      </div>

      {/* Posicion Candidato */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Posición a la que es candidato:
        </label>
        <select
          className={`form-control ${state.posicion_candidato ? null : "myInput"
            }`}
          name="posicion_candidato"
          defaultValue={state.posicion_candidato}
          value={state.posicion_candidato ? state.posicion_candidato : ""}
          onChange={setInfo}
          placeholder="Posición a la que es candidato..."
        >
          <option value="">---Seleccione---</option>
          {!hideCombatant && <option value="combatiente">Combatiente</option>}
          {!hideCuadrilla && <option value="jefe_de_cuadrilla">Jefe de Cuadrilla</option>}
          {!hideTecnico && <option value="jefe_de_brigada">Jefe de Brigada</option>}
          {!hideTecnico && <option value="tecnico">Técnico</option>}
        </select>
      </div>

      {/* Dependencia */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Dependencia (No usar acronimos)
        </label>
        <input
          className={`form-control ${state.dependencia ? null : "myInput"}`}
          name="dependencia"
          value={state.dependencia ? state.dependencia : ""}
          onChange={setInfo}
          onChangeCapture={ToMayus}
          placeholder="Ingrese Dependencia..."
        />
      </div>

      {/* Tipo de dependencia */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">Tipo de dependencia</label>
        <select
          className={`form-control ${state.tipo_dependencia ? null : "myInput"
            }`}
          name="tipo_dependencia"
          value={state.tipo_dependencia ? state.tipo_dependencia : ""}
          onChange={setInfo}
          placeholder="Ingrese Tipo de dependencia..."
        >
          <option value="">---Seleccione---</option>
          <option value="federal">Federal</option>
          <option value="estatal">Estatal</option>
          <option value="municipal">Municipal</option>
          <option value="sector_social">Sector Social</option>
          <option value="privada">Privada</option>
        </select>
      </div>

      {/* Fecha de ingreso a la dependencia */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">
          Fecha de ingreso a la dependencia
        </label>
        <input
          className={`form-control ${state.fecha_ingreso_dependencia ? null : "myInput"
            }`}
          name="fecha_ingreso_dependencia"
          value={state.fecha_ingreso_dependencia ? state.fecha_ingreso_dependencia : ""}
          type="date"
          onChange={setInfo}
          placeholder="Ingrese Fecha de ingreso a la dependencia..."
        />
      </div>

      {/* Años de experiencia en actividades de manejo del fuego (comprobables) */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">
          Años de experiencia en actividades de manejo del fuego (comprobables)
        </label>
        <InputNumber
          className={`form-control ${state.anios_experiencia ? null : "myInput"
            }`}
          name="anios_experiencia"
          value={state.anios_experiencia ? state.anios_experiencia : ""}
          limitLength={2}
          min={0}
          type="number"
          onChange={setInfo}
          placeholder="Ingrese Años de experiencia en actividades de manejo del fuego comprobables..."
        />
      </div>
      {/* Puesto dependencia */}
      <div className="col-12 col-md-12">
        <label className="control-label pt-2">Puesto en su dependencia</label>
        <input
          className={`form-control ${state.puesto_en_dependencia ? null : "myInput"
            }`}
          name="puesto_en_dependencia"
          value={state.puesto_en_dependencia ? state.puesto_en_dependencia : ""}
          onChange={setInfo}
          onChangeCapture={ToMayus}
          placeholder="Ingrese su puesto en la dependencia..."
        />
      </div>
      {/* Funciones en dependencia */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">
          Funciones en su dependencia
        </label>
        <select
          className={`form-control ${state.funciones_dependencia ? null : "myInput"
            }`}
          name="funciones_dependencia"
          value={state.funciones_dependencia ? state.funciones_dependencia : ""}
          onChange={setInfo}
          placeholder="Ingrese su puesto en la dependencia..."
        >
          <option value="">---Seleccione---</option>
          <option value="operaciones">Operaciones</option>
          <option value="planificacion">Planificación</option>
          <option value="logostica">Logística</option>
          <option value="finanzas">Finanzas</option>
        </select>
      </div>

      {/* Nombre contacto de emergencia */}
      <div className="col-8">
        <label className="control-label pt-2">Nombre de contacto de emergencia</label>
        <input
          className={`form-control ${state.nombre_beneficiario ? null : "myInput"
            }`}
          name="nombre_beneficiario"
          value={state.nombre_beneficiario ? state.nombre_beneficiario : ""}
          onChange={setInfo}
          onChangeCapture={ToMayus}
          placeholder="Ingrese nombre del contacto de emergencia..."
        />
      </div>

      {/* Telefono contacto de emergencia */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Teléfono del contacto de emergencia</label>
        <InputNumber
          className={`form-control ${state.telefono_beneficiario ? null : "myInput"
            }`}
          name="telefono_beneficiario"
          limitLength={10}
          min={0}
          type="number"
          value={state.telefono_beneficiario ? state.telefono_beneficiario : ""}
          onChange={setInfo}
          placeholder="Ingrese Teléfono del contacto de emergencia..."
        />
      </div>

      {/* Correo contacto de emergencia */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          Correo electrónico de contacto de emergencia
        </label>
        <input
          className={`form-control ${state.correo_beneficiario ? null : "myInput"
            }`}
          name="correo_beneficiario"
          value={state.correo_beneficiario ? state.correo_beneficiario : ""}
          onChange={setInfo}
          onBlur={(input) => {
            if (input.target.value) {
              setCorreBenefValido(emailValid(input.target.value));
            }
          }}
          placeholder="Ingrese Correo electrónico del contacto de emergencia..."
        />
        {correBenefValido === false && (
          <div className="col-sm-12">
            <small className="text-danger">El correo no es valido.</small>
          </div>
        )}
      </div>

      {/* Talla de Camisa */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Talla de Camisa</label>
        <SelectTallas
          className={`form-control ${state.talla_camisa ? null : "myInput"}`}
          name="talla_camisa"
          defaultValue={state.talla_camisa ? state.talla_camisa : "F"}
          onChange={setInfo}
        />
      </div>

      {/* Talla de Sudadera */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Talla de Sudadera</label>
        <SelectTallas
          className={`form-control ${state.talla_sudadera ? null : "myInput"}`}
          name="talla_sudadera"
          defaultValue={state.talla_sudadera ? state.talla_sudadera : ""}
          onChange={setInfo}
        />
      </div>

      {/* Talla de Playera */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Talla de Playera</label>
        <SelectTallas
          className={`form-control ${state.talla_playera ? null : "myInput"}`}
          name="talla_playera"
          defaultValue={state.talla_playera ? state.talla_playera : ""}
          onChange={setInfo}
        />
      </div>

      {/* Talla de Pantalón */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Talla de Pantalón</label>
        <SelectTallasPantalon
          className={`form-control ${state.talla_pantalon ? null : "myInput"}`}
          name="talla_pantalon"
          defaultValue={state.talla_pantalon ? state.talla_pantalon : ""}
          onChange={setInfo}
        />
      </div>
      {/* Talla de Gorras */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Talla de Gorras</label>
        <SelectTallasGorras
          className={`form-control ${state.talla_gorras ? null : "myInput"}`}
          name="talla_gorras"
          defaultValue={state.talla_gorras ? state.talla_gorras : ""}
          onChange={setInfo}
        />
      </div>

      {/* Talla de Botas */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Talla de Botas </label>
        <SelectTallasBotas
          className={`form-control ${state.talla_botas ? null : "myInput"}`}
          name="talla_botas"
          defaultValue={state.talla_botas ? state.talla_botas : ""}
          onChange={setInfo}
          onBlur={setInfo}
        />
      </div>

      {/* Nombre del banco */}
      {/* <div className="col-12 col-md-6">
        <label className="control-label pt-2">Nombre del banco</label>
        <SelectBancos
          className={`form-control ${state.nombre_banco ? null : "myInput"}`}
          name="nombre_banco"
          defaultValue={state.nombre_banco}
          onChange={setInfo}
        />
      </div> */}

      {/* Clabe de la cuenta */}
      {/* <div className="col-12 col-md-6">
        <label className="control-label pt-2">Clabe de la cuenta</label>
        <input
          className={`form-control ${
            state.clabe_interbancaria ? null : "myInput"
          }`}
          name="clabe_interbancaria"
          value={state.clabe_interbancaria}
          defaultValue={state.clabe_interbancaria}
          onChange={setInfo}
          maxLength={18}
          minLength={18}
          placeholder="Ingrese numero de clabe de la cuenta..."
        />
      </div> */}

      {/* BTN Continuar */}
      <div className="col-12 pt-5 btn-margin">
        <button
          // disabled={(correoValido && correBenefValido && rfcCorrecto) ? false : true}
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
export default S1;
