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
import GenerarPosiciones from "../../singles/GenerarPosiciones";

const S5 = (props) => {
  const candidatos = useContext(candidatoContext);
  const { curp } = candidatos.candidatos.infoBrigadista;

  const { state, setState, checkData, setStateFiles, files } = props;
  const [showExam, setShowExam] = useState(false);

  const [examResp, setExamResp] = useState({
    curp: curp,
    "1_partes_incendio": "x",
    "2_triangulo_fuego": "x",
    "3_comportamiento_fuego": "x",
    "4_terreno_desconocido": "x",
    "5_combate_incendios": "x",
    "6_significa_vcrz": "x",
    "7_carga_combustible": "x",
    "8_linea_control": "x",
    "9_movimiento_incendio": "x",
    "10_conduce_incendio": "x",
    "11_topografia_elemento": "x",
    "12_elemento_variable": "x",
    "13_referente_combustible": "x",
    "14_tipos_combustible": "x",
    "15_agua_combustible": "x",
    "16_denominadores_comunes": "x",
    "17_lugares_combatiente": "x",
    "18_nivel_minimo": "x",
    "19_accion_conocer": "x",
    "20_cantidad_humedad": "x",
  });
  const [preguntas_s_190, setPreguntas_s_190] = useState(false);
  const [sci_190Examen, setSci_190Examen] = useState(false);

  const terminarExamen = async () => {
    try {
      const respuesta = await axios.post(
        process.env.REACT_APP_BACKEN_URL + "s_190_exam",
        examResp
      );

      if (respuesta.status === 200) {
        if (respuesta.data.calificacion === "reprobado") {
          setState({
            ...state,
            rechazo: true,
            motivo_rechazo: "no aprobo examen si_190",
            examen_s_190: respuesta.data.calificacion,
            fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
          });
        } else {
          setState({
            ...state,
            rechazo: false,
            motivo_rechazo: null,
            examen_s_190: respuesta.data.calificacion,
            fechaCreacion: null,
          });
        }
        setShowExam(false);
        setSci_190Examen(true);
      }
    } catch (error) {
      AlertError("Error", error);
    }
    // console.log('envio de resultados');
  };
  const handleClose = () => {
    Swal.fire({
      title: "Esta seguro que desea terminar la prueba?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        terminarExamen(examResp);
      }
    });
  };
  const handleShow = () => {
    setTimeLeft(900);
    window.onbeforeunload = refreshPage;
    setShowExam(true);
  };

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

  /* TIMER */

  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(1500000000000);

  const refreshPage = async (e) => {
    e.preventDefault();
    // Cancel the event as stated by the standard.
    await terminarExamen();
    await checkData();
    // console.log('terminando');
    e.preventDefault();
    // Chrome requires returnValue to be set.
    e.returnValue = "";
  };

  useEffect(() => {
    if (handleShow) {
    }
    // exit early when we reach 0
    if (!timeLeft) {
      terminarExamen();
    }
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const siguienteExamen = () => {
    // AlertExito('Examen')
    Swal.fire({
      title: "Esta por iniciar una prueba",
      text:
        "Asegurese de tener una conexion estable de internet.\n" +
        "EL EXAMEN NO PODRA VOLVERSE A PRESENTAR SI SE SALE O REFRESCA LA PAGINA.\n" +
        "Cuenta con 15 minutos para responderla.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        /* INICIAR EXAMEN */
        handleShow(true);
      }
    });
    // setSmi_100Examen(true)
  };

  return (
    <div className="row body_wrap">
      <Modal show={showExam} dialogClassName="modal-90w">
        <Modal.Header>
          <Modal.Title>S-130/S-190</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tiempo Restante
          <h2>
            {moment
              .utc(moment.duration(timeLeft, "seconds").asMilliseconds())
              .format("m:ss ")}
          </h2>
          {/* <ExS190 /> */}
          <ExS190 state={examResp} setState={setExamResp} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Terminar
          </Button>
        </Modal.Footer>
      </Modal>

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
                defaultValue={state.tiene_part_brig_nac}
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
                defaultValue={state.tiene_part_mov_nac}
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
                defaultValue={state.tiene_asig_recurso_pais}
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
              onChange={setInfo}
              placeholder="¿Cuántas veces ha sido asignado como recurso nacional en incendios forestales..."
            />
          </div>

        </React.Fragment>
      )}

      {/* BTN SCI/SMI 100 */}
      <div className="col-12 pt-5 btn-margin">
        <button
          hidden={
            state.asignado_recurso_nacional &&
            state.asignado_recurso_otro_pais &&
            !sci_190Examen
              ? false
              : true
          }
          onClick={siguienteExamen}
          className="btn btn-warning"
        >
          Tomar examen S-190/S-130
        </button>
      </div>

      {/* BTN Continuar */}
      <div className="col-12 pt-5 btn-margin">
        <button
          disabled={!sci_190Examen}
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
