import React, { useContext, useEffect, useState } from "react";
import InputNumber from "../../singles/InputNumber";
import calculoIMC from "../../helpers/calculoIMC";
import ToMayus from "../../helpers/ToMayus";
import moment from "moment";
import { InputGroup } from "react-bootstrap";

import pruebasFisicasContext from "../../context/pruebas_fisicas/pruebasFisicasContext";
import SelectSiNo from "../../singles/SelectSiNo";

const S9_S10View = (props) => {
  /* TODO:
        -> si IMC mayor a 29.9 restriccion de campos siguientes y S10, excepto formato apt. fisica
        -> cuenta con equipo despliegue boolean input file archivo soporte
        -> mask IMC step 0.01
    */

  const pruebasContext = useContext(pruebasFisicasContext);

  const [archivos, setArchivos] = useState({
    formato: null,
    formato_epp: null,
    formato_eval_habilidad_uso_mark_III: null,
    constancia_curso_s_211: null,
  });

  /* SECCIONES */
  const [sectionGPSMark, setSectionGPSMark] = useState(true);
  const [sectionEPP, setSectionEPP] = useState(true);
  const [sectionPruebaFisica, setSectionPruebaFisica] = useState(true);

  const [evaluaciones, setEvaluaciones] = useState(props.infoCandidato);

  const setInfo = (input) => {
    if (
      input.target.name === "formato" ||
      input.target.name === "formato_eval_habilidad_uso_mark_III" ||
      input.target.name === "constancia_curso_s_211" ||
      input.target.name === "formato_epp" ||
      input.target.name === "formato_eval_habilidad_uso_gps"
    ) {
      setArchivos({
        ...archivos,
        [input.target.name]: input.target.files,
      });
    } else {
      setEvaluaciones({
        ...evaluaciones,
        [input.target.name]: input.target.value,
      });
    }
  };

  const calculoTiempoMax = (asnm) => {
    /* asnm => Altura sobre el nivel del mar */
    if (asnm) {
      if (asnm < 1200) {
        setEvaluaciones({
          ...evaluaciones,
          tiempo_req_max_min: 45,
          tiempo_req_mas_seg: "00",
        });
      }

      if (asnm >= 1200 && asnm <= 1500) {
        setEvaluaciones({
          ...evaluaciones,
          tiempo_req_max_min: 45,
          tiempo_req_mas_seg: 30,
        });
      }

      if (asnm > 1500 && asnm <= 1800) {
        setEvaluaciones({
          ...evaluaciones,
          tiempo_req_max_min: 45,
          tiempo_req_mas_seg: 45,
        });
      }

      if (asnm > 1800 && asnm <= 2100) {
        setEvaluaciones({
          ...evaluaciones,
          tiempo_req_max_min: 46,
          tiempo_req_mas_seg: "00",
        });
      }

      if (asnm > 2100 && asnm <= 2400) {
        setEvaluaciones({
          ...evaluaciones,
          tiempo_req_max_min: 46,
          tiempo_req_mas_seg: 15,
        });
      }

      if (asnm > 2400) {
        setEvaluaciones({
          ...evaluaciones,
          tiempo_req_max_min: 46,
          tiempo_req_mas_seg: 30,
        });
      }
    } else {
      setEvaluaciones({
        ...evaluaciones,
        tiempo_req_max_min: "",
        tiempo_req_mas_seg: "",
      });
    }
  };

  const handleEPP = (input) => {
    const presento_equipo = input.target.value;
    if (presento_equipo === "1") {
      setSectionGPSMark(true);
    } else {
      setSectionGPSMark(false);
    }
  };

  const handleASNM = () => {
    const { altura_sobre_niv_mar } = evaluaciones;
    calculoTiempoMax(altura_sobre_niv_mar);
  };

  const handleIMC = () => {
    const { altura_verificada, peso_verificado } = evaluaciones;
    if (altura_verificada && peso_verificado) {
      const imc = calculoIMC(altura_verificada, peso_verificado);
      if (imc < 29.99) {
        setSectionPruebaFisica(true);
        setEvaluaciones({
          ...evaluaciones,
          imc_verificado: imc.toString().slice(0, 5),
          rechazo: null,
        });
      } else {
        /* SET RECHAZO POR IMC */
        setEvaluaciones({
          ...evaluaciones,
          imc_verificado: imc.toString().slice(0, 5),
          rechazo: "imc verificado mayor a 29.99",
        });
        setSectionPruebaFisica(false);
      }
    }
  };

  const calcResultados = () => {
    const { minutos_prueba_trabajo_arduo, segundos_prueba_trabajo_arduo } =
      evaluaciones;

    if (minutos_prueba_trabajo_arduo && segundos_prueba_trabajo_arduo) {
      const auxPrueba = calificacionPrueba(
        minutos_prueba_trabajo_arduo,
        segundos_prueba_trabajo_arduo
      );
      const rechazo =
        auxPrueba === "SUPERADA" ? null : "prueba fisica no superada";

      /* SI NO ES RECHAZADO SE ABRE SECCION DE EQUIPO DE DESPLIEGUE */
      if (rechazo) {
        setSectionEPP(false);
      } else {
        setSectionEPP(true);
      }
      setEvaluaciones({
        ...evaluaciones,
        puntuacion_estimada: puntajePrueba(
          minutos_prueba_trabajo_arduo,
          segundos_prueba_trabajo_arduo
        ),
        prueba: calificacionPrueba(
          minutos_prueba_trabajo_arduo,
          segundos_prueba_trabajo_arduo
        ),
        rechazo: rechazo,
      });
    } else {
      setEvaluaciones({
        ...evaluaciones,
        puntuacion_estimada: "",
        prueba: "",
      });
    }
  };

  const puntajePrueba = (minutos, segundos) => {
    const tiempo = moment(`${minutos}:${segundos}`, "mm:ss");
    const primerCaso = moment(`35:00`, "mm:ss");
    const segundoCaso = moment(`40:00`, "mm:ss");
    const tercerCaso = moment(`46:30`, "mm:ss");

    if (tiempo <= primerCaso) {
      return "10";
    }
    if (tiempo > primerCaso || tiempo <= segundoCaso) {
      return "9.5";
    }
    if (tiempo > segundoCaso || tiempo <= tercerCaso) {
      return "9";
    }
  };

  const calificacionPrueba = (minutos, segundos) => {
    const { tiempo_req_max_min, tiempo_req_mas_seg } = evaluaciones;

    const tiempo = moment(`${minutos}:${segundos}`, "mm:ss");
    // const primerCaso = moment(`35:00`, 'mm:ss')
    // const segundoCaso = moment(`40:00`, 'mm:ss')
    // const tercerCaso = moment(`46:30`, 'mm:ss')

    const tiempoMaxRequerido = moment(
      `${tiempo_req_max_min}:${tiempo_req_mas_seg}`,
      "mm:ss"
    );

    return tiempo <= tiempoMaxRequerido ? "SUPERADA" : "NO SUPERADA";
  };

  useEffect(() => {
    /* se agrega al conext global el estate */
    pruebasContext.cand.agregarPruebas({
      ...pruebasContext.cand,
      pruebasCandidato: evaluaciones,
    });
  }, [evaluaciones]);

  return (
    <>
      <div className="row body_wrap">
        {/* DATOS DEL CANDIDATO */}
        {/* ENCABEZADO */}
        <div className="col-12 col-md-12 center-text">
          <h2>Evaluaciones Arduo</h2>
        </div>
        {/* FORMATO APTITUD FISICA */}
        <div className="col-12 col-md-12">
          <a
            className="btn btn-dark"
            href={`${process.env.REACT_APP_BACKEN_FILES}${evaluaciones.curp}/formato.pdf`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Formato de aptitud física
          </a>
        </div>
        {/* NOMBRE DEL EVALUADOR */}
        <div className="col-12 col-md-12">
          <label className="control-label pt-2">Nombre del evaluador</label>
          <input
            className={`form-control ${
              evaluaciones.nombre_evaluador ? null : "myInput"
            }`}
            disabled
            name="nombre_evaluador"
            value={evaluaciones.nombre_evaluador}
            type="text"
            // accept="image/png,image/jpeg"
            onChange={setInfo}
            // onChangeCapture={ToMayus}
            placeholder="Ingrese Nombre completo..."
          />
        </div>
        {/* PESO VERIFICADO */}
        <div className="col-12 col-md-4">
          <label className="control-label pt-2">Peso comprobado</label>
          <InputNumber
            className={`form-control ${
              evaluaciones.peso_verificado ? null : "myInput"
            }`}
            disabled
            name="peso_verificado"
            limitLength={5}
            min={0}
            step="0.1"
            type="number"
            value={evaluaciones.peso_verificado}
            // accept="image/png,image/jpeg"
            onChange={setInfo}
            onBlur={handleIMC}
            placeholder="Ingrese Peso verificado..."
          />
          <label className="control-label pt-2">Peso Comprobado (Libras)</label>
          <input
            className="form-control myInput"
            value={
              evaluaciones.peso_verificado
                ? Math.round(evaluaciones.peso_verificado * 2.2046 * 10) / 10
                : ""
            }
            type="number"
            readOnly={true}
            min={0}
            placeholder="Ingrese Peso verificado (lb)..."
          />
        </div>
        {/* Altura VERIFICADO */}
        <div className="col-12 col-md-4">
          <label className="control-label pt-2">Altura comprobado (cm.)</label>
          <InputNumber
            className={`form-control ${
              evaluaciones.altura_verificada ? null : "myInput"
            }`}
            disabled
            name="altura_verificada"
            limitLength={3}
            min={0}
            type="number"
            value={evaluaciones.altura_verificada}
            // accept="image/png,image/jpeg"
            onChange={setInfo}
            onBlur={handleIMC}
            placeholder="Ingrese Altura verificada..."
          />
          <label className="control-label pt-2">Altura Comprobada (Pies)</label>
          <input
            className="form-control myInput"
            value={
              evaluaciones.altura_verificada
                ? Math.round(evaluaciones.altura_verificada * 0.0328084 * 10) /
                  10
                : ""
            }
            type="number"
            step="0"
            readOnly={true}
            min={0}
            placeholder="Ingrese Altura verificada (ft)..."
          />
        </div>
        {/* IMC VERIFICADO */}
        <div className="col-12 col-md-4">
          <label className="control-label pt-2">IMC verificado</label>
          <input
            disabled
            className={`form-control ${
              evaluaciones.imc_verificado ? null : "myInput"
            }`}
            name="imc_verificado"
            type="text"
            value={evaluaciones.imc_verificado}
            // accept="image/png,image/jpeg"
            onChange={setInfo}
            placeholder="Calculo de IMC..."
          />
        </div>
        {/* SECCION PRUEBAS FISICAS*/}
        {sectionPruebaFisica && (
          <React.Fragment>
            {/* Altura SOBRE NIVEL DEL MAR */}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                Altura sobre el nivel del mar del lugar donde se realizó la
                prueba.
              </label>
              <InputNumber
                className={`form-control ${
                  evaluaciones.altura_sobre_niv_mar ? null : "myInput"
                }`}
                disabled
                name="altura_sobre_niv_mar"
                limitLength={4}
                min={0}
                type="number"
                value={evaluaciones.altura_sobre_niv_mar}
                // accept="image/png,image/jpeg"
                onChange={setInfo}
                onBlur={handleASNM}
                placeholder="Ingrese Altura sobre el nivel del mar..."
              />
            </div>
            {/* TIEMPO MÁXIMO REQUERIDO CON CORRECCIÓN POR ALTITUD */}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                Tiempo máximo requerido con corrección por altitud.
              </label>
              <input
                disabled
                className={`form-control ${
                  evaluaciones.tiempo_req_mas_seg ? null : "myInput"
                }`}
                name="tiempo_req_mas_seg"
                type="text"
                value={`${evaluaciones.tiempo_req_max_min}' ${evaluaciones.tiempo_req_mas_seg}''`}
                placeholder="Ingrese Altura sobre el nivel del mar..."
              />
            </div>
            {/* TIEMPO REALIZADO EN LA PRUEBA DE TRABAJO ARDUO */}
            <div className="col-12 col-md-3">
              <label className="control-label pt-2">
                Tiempo realizado en la prueba de trabajo arduo.
              </label>
              <InputGroup className="mb-2">
                <InputNumber
                  disabled
                  className={`form-control ${
                    evaluaciones.minutos_prueba_trabajo_arduo ? null : "myInput"
                  }`}
                  placeholder="Minutos..."
                  limitLength={2}
                  min={0}
                  value={evaluaciones.minutos_prueba_trabajo_arduo}
                  name="minutos_prueba_trabajo_arduo"
                  onChange={setInfo}
                  onBlur={calcResultados}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>'</InputGroup.Text>
                </InputGroup.Prepend>
                <InputNumber
                  className={`form-control ${
                    evaluaciones.segundos_prueba_trabajo_arduo
                      ? null
                      : "myInput"
                  }`}
                  disabled
                  placeholder="Segundos..."
                  limitLength={2}
                  min={0}
                  value={evaluaciones.segundos_prueba_trabajo_arduo}
                  name="segundos_prueba_trabajo_arduo"
                  onChange={setInfo}
                  onBlur={calcResultados}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>''</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </div>
            {/* Puntuacion estimada*/}
            <div className="col-12 col-md-4">
              <label className="control-label pt-2">Puntuación estimada.</label>
              <InputNumber
                disabled
                className={`form-control ${
                  evaluaciones.puntuacion_estimada ? null : "myInput"
                }`}
                name="puntuacion_estimada"
                value={evaluaciones.puntuacion_estimada}
                // onChange={setInfo}
                placeholder="Ingrese Minutos y Segundos de la prueba..."
              />
            </div>
            {/* PRUEBA */}
            <div className="col-12 col-md-5">
              <label className="control-label pt-2">Prueba:</label>
              <input
                disabled
                className={`form-control ${
                  evaluaciones.prueba ? null : "myInput"
                }`}
                name="prueba"
                // onChange={setInfo}
                value={evaluaciones.prueba}
                placeholder="Resultados de la prueba..."
              />
            </div>

            {/* ENCABEZADO */}
            <div className="col-12 pt-5 col-md-12 center-text">
              <h2>Evaluaciones Carrera</h2>
            </div>
            {/* FORMATO APTITUD FISICA */}
            <div className="col-12 col-md-12">
              <a
                className="btn btn-dark"
                href={`${process.env.REACT_APP_BACKEN_FILES}${evaluaciones.curp}/formato_carrera.pdf`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Formato de prueba de Carrera
              </a>
            </div>

            <div className="col-12 col-md-12">
              <label className="control-label pt-2">
                Nombre del evaluador de la prueba de la carrera
              </label>
              <input
                className={`form-control ${
                  evaluaciones.nombre_evaluador_carrera ? null : "myInput"
                }`}
                disabled
                name="nombre_evaluador_carrera"
                value={evaluaciones.nombre_evaluador_carrera}
                type="text"
                onChange={setInfo}
                onChangeCapture={ToMayus}
                placeholder="Ingrese Nombre completo..."
              />
            </div>
            {/* ALTURA SOBRE EL NIVEL DEL MAR PRUEBA CARRERA */}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                Altura sobre el nivel del mar del lugar donde se realizó la
                prueba.
              </label>
              <InputNumber
                className={`form-control ${
                  evaluaciones.altura_sobre_niv_mar_carrera ? null : "myInput"
                }`}
                disabled
                name="altura_sobre_niv_mar_carrera"
                limitLength={4}
                min={0}
                type="number"
                value={evaluaciones.altura_sobre_niv_mar_carrera}
                onChange={setInfo}
                onBlur={handleASNM}
                placeholder="Ingrese Altura sobre el nivel del mar..."
              />
            </div>
            {/* TIEMPO REALIZADO EN LA PRUEBA DE TRABAJO CARRERA */}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                Tiempo realizado en la prueba de trabajo de la carrera.
              </label>
              <InputGroup className="mb-2">
                <InputNumber
                  className={`form-control ${
                    evaluaciones.minutos_prueba_trabajo_carrera
                      ? null
                      : "myInput"
                  }`}
                  disabled
                  placeholder="Minutos..."
                  limitLength={2}
                  min={0}
                  value={evaluaciones.minutos_prueba_trabajo_carrera}
                  name="minutos_prueba_trabajo_carrera"
                  onChange={setInfo}
                  onBlur={calcResultados}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>'</InputGroup.Text>
                </InputGroup.Prepend>
                <InputNumber
                  className={`form-control ${
                    evaluaciones.segundos_prueba_trabajo_carrera
                      ? null
                      : "myInput"
                  }`}
                  disabled
                  placeholder="Segundos..."
                  limitLength={2}
                  min={0}
                  value={evaluaciones.segundos_prueba_trabajo_carrera}
                  name="segundos_prueba_trabajo_carrera"
                  onChange={setInfo}
                  onBlur={calcResultados}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>''</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </div>
          </React.Fragment>
        )}
        {/* SECCION EQUIPO DE DESPLIEGUE */}
        {sectionEPP && (
          <React.Fragment>
            <div className="col-12 col-md-12 center-text pt-5">
              <h2>Equipo de despliegue</h2>
            </div>
            <div className="col-12 col-md-12">
              <a
                className="btn btn-dark"
                href={`${process.env.REACT_APP_BACKEN_FILES}${evaluaciones.curp}/formato_epp.pdf`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Formato de equipo de despliegue completo
              </a>
            </div>
            <div className="col-12 col-md-12">
              <label className="control-label pt-2">
                ¿El candidato presentó el equipo de despliegue completo?
              </label>
              {!props.enabled ? (
                <input
                  disabled
                  className={`form-control ${
                    evaluaciones.presento_equipo ? null : "myInput"
                  }`}
                  value={evaluaciones.presento_equipo === "1" ? "SI" : "NO"}
                />
              ) : (
                <SelectSiNo
                  className={`form-control ${
                    evaluaciones.presento_equipo ? null : "myInput"
                  }`}
                  disabled
                  name="presento_equipo"
                  defaultValue={evaluaciones.presento_equipo}
                  onChange={setInfo}
                  onChangeCapture={handleEPP}
                />
              )}
            </div>
          </React.Fragment>
        )}
        {/* SECCION GPS-MARK*/}
        {sectionGPSMark && (
          <React.Fragment>
            {/* ENCABEZADO */}
            <div className="col-12 col-md-12 center-text pt-5">
              <h2>GPS y Bomba MARK III</h2>
            </div>
            {/* Nombre del evaluador prueba GPS */}
            <div className="col-12 col-md-12">
              <label className="control-label pt-2">
                Nombre del evaluador prueba GPS
              </label>
              <input
                disabled
                className={`form-control ${
                  evaluaciones.nombre_evaluador_prueba_gps ? null : "myInput"
                }`}
                type="text"
                value={evaluaciones.nombre_evaluador_prueba_gps}
                name="nombre_evaluador_prueba_gps"
                // onChange={setInfo}
                onChangeCapture={ToMayus}
                placeholder="Ingrese Nombre del evaluador prueba GPS..."
              />
            </div>
            {/* Formato de evaluación habilidad y competencia en el uso de GPS */}
            <div className="col-12 pt-2 col-md-12">
              <a
                className="btn btn-dark"
                href={`${process.env.REACT_APP_BACKEN_FILES}${evaluaciones.curp}/formato_eval_habilidad_uso_gps.pdf`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Formato de evaluación habilidad y competencia en el uso de GPS
              </a>
            </div>
            {/* Resultado de la evaluación presencial de GPS */}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                Resultado de la evaluación presencial de GPS
              </label>
              <InputNumber
                disabled
                className={`form-control ${
                  evaluaciones.resultado_eval_presencial_gps ? null : "myInput"
                }`}
                limitLength={1}
                value={evaluaciones.resultado_eval_presencial_gps}
                name="resultado_eval_presencial_gps"
                placeholder="Ingrese Resultado de la evaluación presencial de GPS..."
              />
            </div>
            {/* porcentaje GPS*/}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                % la evaluación presencial de GPS
              </label>
              <input
                disabled
                className={`form-control ${
                  evaluaciones.porcentaje_gps ? null : "myInput"
                }`}
                value={evaluaciones.porcentaje_gps}
                name="porcentaje_gps"
                // onChange={setInfo}
                placeholder="calculo porcentaje de la evaluación presencial de GPS..."
              />
            </div>
            {/* Nombre del evaluador prueba Mark III */}
            <div className="col-12 col-md-12">
              <label className="control-label pt-2">
                Nombre del evaluador prueba Mark III
              </label>
              <input
                disabled
                className={`form-control ${
                  evaluaciones.nombre_evaluador_prueba_mark_III
                    ? null
                    : "myInput"
                }`}
                type="text"
                // onChangeCapture={ToMayus}
                value={evaluaciones.nombre_evaluador_prueba_mark_III}
                name="nombre_evaluador_prueba_mark_III"
                onChange={setInfo}
                placeholder="Ingrese Nombre del evaluador prueba Mark III..."
              />
            </div>
            {/* Formato de evaluación habilidad y competencia en el uso de Mark III */}
            <div className="col-12 pt-2 col-md-12">
              <a
                className="btn btn-dark"
                href={`${process.env.REACT_APP_BACKEN_FILES}${evaluaciones.curp}/formato_eval_habilidad_uso_mark_III.pdf`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Formato de evaluación habilidad y competencia en el uso de Mark
                III
              </a>
            </div>
            {/* Resultado de la evaluación presencial de Mark III */}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                Resultado de la evaluación presencial de Mark III
              </label>
              <InputNumber
                disabled
                className={`form-control ${
                  evaluaciones.resultado_eval_presencial_mark_III
                    ? null
                    : "myInput"
                }`}
                limitLength={2}
                value={evaluaciones.resultado_eval_presencial_mark_III}
                name="resultado_eval_presencial_mark_III"
                onChange={setInfo}
                placeholder="Ingrese Resultado de la evaluación presencial de Mark III..."
              />
            </div>
            {/* porcentaje GPS*/}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                % la evaluación presencial de Mark III
              </label>
              <input
                disabled
                className={`form-control ${
                  evaluaciones.porcentaje_mark_III ? null : "myInput"
                }`}
                value={evaluaciones.porcentaje_mark_III}
                name="porcentaje_mark_III"
                placeholder="calculo porcentaje de la evaluación presencial de mark_III..."
              />
            </div>

            {/* Formato de evalución de la Motosierra */}
            <div className="col-12 pt-2 col-md-12">
              <a
                className="btn btn-dark"
                href={`${process.env.REACT_APP_BACKEN_FILES}${evaluaciones.curp}/formato_eval_habilidad_uso_motosierra.pdf`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Formato de evaluación habilidad y competencia en el uso de
                Motosierra
              </a>
            </div>
            {/* Nombre del evaluador prueba Motosierra */}
            <div className="col-12 col-md-12">
              <label className="control-label pt-2">
                Nombre del evaluador prueba Motosierra
              </label>
              <input
                className={`form-control ${
                  evaluaciones.nombre_evaluador_prueba_motosierra
                    ? null
                    : "myInput"
                }`}
                disabled
                type="text"
                onChangeCapture={ToMayus}
                value={evaluaciones.nombre_evaluador_prueba_motosierra}
                name="nombre_evaluador_prueba_motosierra"
                onChange={setInfo}
                placeholder="Ingrese Nombre del evaluador prueba Motosierra..."
              />
            </div>

            {/* Resultado de la evaluación presencial de Motosierra */}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                Resultado de la evaluación presencial de Motosierra
              </label>
              <InputNumber
                className={`form-control ${
                  evaluaciones.resultado_eval_presencial_motosierra
                    ? null
                    : "myInput"
                }`}
                disabled
                limitLength={2}
                value={evaluaciones.resultado_eval_presencial_motosierra}
                name="resultado_eval_presencial_motosierra"
                onChange={setInfo}
                placeholder="Ingrese Resultado de la evaluación presencial de Motosierra..."
              />
            </div>
            {/* porcentaje Motosierra*/}
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                % la evaluación presencial de Motosierra
              </label>
              <input
                disabled
                className={`form-control ${
                  evaluaciones.porcentaje_motosierra ? null : "myInput"
                }`}
                value={evaluaciones.porcentaje_motosierra}
                name="porcentaje_motosierra"
                onChange={setInfo}
                placeholder="calculo porcentaje de la evaluación presencial de Motosierra..."
              />
            </div>
            {/* ¿El evaluado presento constancia del curso S-211 */}
            <div className="col-12 pt-2 col-md-12">
              <a
                className="btn btn-dark"
                href={`${process.env.REACT_APP_BACKEN_FILES}${evaluaciones.curp}/constancia_curso_s_211.pdf`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Constancia de Curso S-211
              </a>
            </div>
            <div className="col-12 col-md-6">
              <label className="control-label pt-2">
                ¿El evaluado presento constancia del curso S-211?
              </label>
              <SelectSiNo
                disabled
                className={`form-control ${
                  evaluaciones.presento_constancia_s_211 ? null : "myInput"
                }`}
                type="text"
                name="presento_constancia_s_211"
                onChange={setInfo}
                defaultValue={evaluaciones.presento_constancia_s_211}
              />
            </div>
          </React.Fragment>
        )}
        <div className="text-center py-3 col-md-12"></div>
        <div className="text-center py-3 col-md-12"></div>
      </div>
    </>
  );
};

export default S9_S10View;
