import React, { useEffect, useState } from "react";
import ToMayus from "../../helpers/ToMayus";
import SelectSexo from "../../singles/SelectSexo";
import AlertaSiguiente from "../../singles/AlertaSiguiente";
import diferenciaFechaDias from "../../helpers/diferenciaFechaDias";
import { size } from "lodash";
import SelectSiNo from "../../singles/SelectSiNo";
import { formatDate } from "../../helpers/formatDate";
import { validarExtPdf } from "../../helpers/validarExtPDF";
import AlertError from "../../singles/AlertError";
import SelectVacuna from "../../singles/SelectVacunas";
import { ObtenerVacunas } from "../../services/catalogs/CatalogoService";
const S3 = (props) => {

  const { state, setState, checkData, files, setStateFiles } = props;
  const [vacunas, setVacunas] = useState([]);
  const [timeout, setTimeout] = useState(0);


  useEffect(() => {
    setTimeout(() => {
      ObtenerVacunas().then((response) => {
        if (response.status === 200) {
          setVacunas(response.data);
        }
      }).catch((error) => {
        AlertError("Error al obtener la lista de vacunas");
      })
    }, 2000);

    return () => clearTimeout(timeout);
  }, [])

  const setInfo = (input) => {
    if (input.target.value < 0) {
      input.target.value = Math.abs(input.target.value);
    }
    if (
      input.target.name === "cert_toxicologico" ||
      input.target.name === "cert_medico" ||
      input.target.name === "certificado_covid" ||
      input.target.name === "certificado_covid_refuerzo"
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

  const handleChange = ({ target }) => {
    setState({ ...state, data: { ...state.data, [target.name]: target.value } });
  }

  const setNumerico = (input) => {
    if (input.target.name === "altura") {
      if (size(input.target.value) < 4) {
        setState({
          ...state,
          [input.target.name]: parseInt(
            input.target.value
          ) /* TRANSFORMACION A ENTERO */,
        });
      }
    }
    if (input.target.name === "peso") {
      if (
        (size(input.target.value) < 6 &&
          String(input.target.value).includes(".")) ||
        size(input.target.value) < 4
      ) {
        setState({
          ...state,
          [input.target.name]: parseFloat(
            input.target.value
          ) /* TRANSFORMACION A FLOTANTE */,
        });
      }
    }
  };

  const calculoIMC = () => {
    const { altura, peso } = state;
    if (altura && peso) {
      const alturaM = parseInt(altura) / 100;
      const imc =
        Math.round((parseFloat(peso) / Math.pow(alturaM, 2)) * 100) / 100;
      setState({
        ...state,
        imc: imc,
      });
    }
  };

  const isUnique = (id) => {
    return vacunas.find(item => item.id === id)?.dosisunica === '1' ? false : true;
  }

  const revisarFormulario = () => {
    const {
      imc,
      fecha_cert_toxicologico,
      fecha_cert_medico,
      padece_enfermedad,
      requiere_medicamentos_perm,
      experimento_dolor_pecho,
      experimento_dificultad_respirar,
      presion_arterial_sistolica_diastolica,
      enfermedad_cardiaca,
      cirugia_corazon,
      pulso_mayor_100,
      problemas_afeccion_osea,
      experiencia_personal_consejos,
      medico_personal_recomendo,
      data,
    } = state;

    const dif_cert_med = diferenciaFechaDias(fecha_cert_medico);
    const dif_cert_tox = diferenciaFechaDias(fecha_cert_toxicologico);
    /* IMC mayor a 30 */
    if (parseFloat(imc) >= 30) {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "imc mayo 30",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });
      /* certificado toxicologico mayor a 15 dias */

    } else if (dif_cert_med > 31) {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "certificado médico excede 1 mes",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });
    }
    else if (dif_cert_tox > 31) {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "certificado toxicológico excede 1 mes",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });
      /* Certificado medico mayor a 1 mes */
    } else if (
      padece_enfermedad === "1" ||
      requiere_medicamentos_perm === "1" ||
      experimento_dolor_pecho === "1" ||
      experimento_dificultad_respirar === "1" ||
      presion_arterial_sistolica_diastolica === "1" ||
      enfermedad_cardiaca === "1" ||
      cirugia_corazon === "1" ||
      pulso_mayor_100 === "1" ||
      problemas_afeccion_osea === "1" ||
      experiencia_personal_consejos === "1" ||
      medico_personal_recomendo === "1"
    ) {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "problemas de salud",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
      });
    } else if (data && data.esquema_completo === "0") {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "No cuenta con el esquema de vacunación completo",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0)
      });
    } else if (data && data?.vacuna_aprobada === "0") {
      setState({
        ...state,
        rechazo: true,
        motivo_rechazo: "No cuenta con una vacuna aprobatoria para viajar",
        fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0)
      });
    } else {
      setState({
        ...state,
        rechazo: false,
        motivo_rechazo: null,
        fechaCreacion: null
      });
    }
  }

  return (
    <div className="row body_wrap">
      {/* Sexo TODO: cambiar */}
      <div className="col-12 col-md-3">
        <label className="control-label pt-2">Sexo</label>
        <SelectSexo
          className="form-control myInput"
          name="sexo"
          value={state.sexo ? state.sexo : ""}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="Ingrese Sexo..."
        />
      </div>
      {/* Altura (centímetros) */}
      <div className="col-12 col-md-3">
        <label className="control-label pt-2">Altura (centímetros)</label>
        <input
          className="form-control myInput"
          name="altura"
          value={state.altura ? state.altura : ""}
          type="number"
          step="0"
          onBlur={calculoIMC}
          onChange={setNumerico}
          placeholder="Ingrese Altura (cm)..."
        />
        <label className="control-label pt-2">Altura (Pies)</label>
        <input
          className="form-control myInput"
          value={
            state.altura ? Math.round(state.altura * 0.0328084 * 10) / 10 : ""
          }
          type="number"
          step="0"
          disabled={true}
          min={0}
          placeholder="Ingrese Altura (ft)..."
        />
      </div>
      {/* Peso (kilogramos) */}
      <div className="col-6 col-md-3">
        <label className="control-label pt-2">Peso (kilogramos)</label>
        <input
          className="form-control myInput"
          name="peso"
          value={state.peso ? state.peso : ""}
          type="number"
          step="0.0"
          onBlur={calculoIMC}
          onChange={setNumerico}
          placeholder="Ingrese Peso (kg)..."
        />

        <label className="control-label pt-2">Peso (Libras)</label>
        <input
          className="form-control myInput"
          value={state.peso ? Math.round(state.peso * 2.2046 * 10) / 10 : ""}
          type="number"
          disabled={true}
          min={0}
          placeholder="Ingrese Peso (lb)..."
        />
      </div>

      {/* IMC */}
      <div className="col-6 col-md-3">
        <label className="control-label pt-2">IMC</label>
        <input
          disabled={true}
          name="imc"
          value={state.imc ? state.imc : ""}
          className="form-control myInput"
          onChange={revisarFormulario}
          placeholder="IMC..."
        />
      </div>

      {/* Grupo Sanguíneo */}
      <div className="col-6 col-md-4">
        <label className="control-label pt-2">Grupo Sanguíneo</label>
        <select
          className="form-control myInput"
          name="grupo_sanguineo"
          value={state.grupo_sanguineo ? state.grupo_sanguineo : ""}
          maxLength="6"
          // onChangeCapture={ToMayus}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="Ingrese Grupo Sanguíneo..."
        >
          <option value="">---Seleccione---</option>
          <option value="O RH-">O RH-</option>
          <option value="O RH+">O RH+</option>
          <option value="A RH-">A RH-</option>
          <option value="A RH+">A RH+</option>
          <option value="B RH-">B RH-</option>
          <option value="B RH+">B RH+</option>
          <option value="AB RH-">AB RH-</option>
          <option value="AB RH+">AB RH+</option>
        </select>
      </div>

      {/* Certificado toxicológico */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">Certificado toxicológico</label>
        <input
          className="form-control myInput"
          name="cert_toxicologico"
          // value={state.cert_toxicologico}
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="Ingrese Certificado toxicológico..."
        />
      </div>

      {/* Certificado toxicológico Fecha */}
      <div className="col-12 col-md-4">
        <label className="control-label pt-2">
          Certificado toxicológico Fecha
        </label>
        <input
          className="form-control myInput"
          name="fecha_cert_toxicologico"
          value={state.fecha_cert_toxicologico ? state.fecha_cert_toxicologico : ""}
          type="date"
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="Ingrese Certificado toxicológico Fecha..."
        />
      </div>

      {/* Certificado médico */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Certificado médico o historia clínica</label>
        <input
          className="form-control myInput"
          name="cert_medico"
          // value={state.cert_medico}
          type="file"
          accept="application/pdf"
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="Ingrese Certificado médico..."
        />
      </div>

      {/* Certificado médico Fecha */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">Certificado médico o historia clínica Fecha</label>
        <input
          className="form-control myInput"
          name="fecha_cert_medico"
          value={state.fecha_cert_medico ? state.fecha_cert_medico : ""}
          type="date"
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="Ingrese Certificado médico Fecha..."
        />
      </div>

      {/* ¿Padece alguna enfermedad Crónica? */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          ¿Padece alguna enfermedad Crónica?
        </label>
        <SelectSiNo
          className="form-control myInput"
          name="padece_enfermedad"
          value={state.padece_enfermedad ? state.padece_enfermedad : ""}
          onChange={setInfo}
          onBlur={revisarFormulario}
        />
      </div>

      {/* ¿Qué enfermedad padece? */}
      {state.padece_enfermedad === "1" && (
        <React.Fragment>
          <div className="col-12 col-md-6">
            <label className="control-label pt-2">
              ¿Qué enfermedad padece?
            </label>
            <input
              className="form-control myInput"
              name="que_enfermedad"
              onChangeCapture={ToMayus}
              value={state.que_enfermedad ? state.que_enfermedad : ""}
              onChange={setInfo}
              onBlur={revisarFormulario}
              placeholder="Qué enfermedad padece"
            />
          </div>
        </React.Fragment>
      )}
      {/* ¿Requiere medicamentos de manera permanente? */}
      <div className="col-12 col-md-6">
        <label className="control-label pt-2">
          ¿Requiere medicamentos de manera permanente?
        </label>
        <SelectSiNo
          className="form-control myInput"
          name="requiere_medicamentos_perm"
          value={state.requiere_medicamentos_perm ? state.requiere_medicamentos_perm : ""}
          onChange={setInfo}
          onBlur={revisarFormulario}
        />
      </div>

      {/* ¿Requiere medicamentos de manera permanente? */}
      {state.requiere_medicamentos_perm === "1" && (
        <React.Fragment>
          <div className="col-12 col-md-6">
            <label className="control-label pt-2">
              ¿Qué medicamentos requiere de manera permanente?
            </label>
            <input
              className="form-control myInput"
              name="que_medicamentos"
              value={state.que_medicamentos}
              onChange={setInfo}
              onChangeCapture={ToMayus}
              onBlur={revisarFormulario}
              placeholder="¿Qué medicamentos requiere de manera permanente?"
            />
          </div>
        </React.Fragment>
      )}

      {/* ¿Experimentó dolor, incomodidad o presión en el pecho? */}
      <div className="col-12">
        <label className="control-label pt-2">
          Durante los últimos 12 meses, en cualquier momento (durante la
          actividad física o mientras descansa) ¿experimentó dolor, incomodidad
          o presión en el pecho?
        </label>
        <select
          className="form-control myInput"
          name="experimento_dolor_pecho"
          value={state.experimento_dolor_pecho}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="¿Experimentó dolor, incomodidad o presión en el pecho?"
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div>

      {/* ¿Ha experimentado dificultad para respirar, mareos, desmayos o pérdida del conocimiento? */}
      <div className="col-12">
        <label className="control-label pt-2">
          Durante los últimos 12 meses, ¿ha experimentado dificultad para
          respirar, mareos, desmayos o pérdida del conocimiento?
        </label>
        <select
          className="form-control myInput"
          name="experimento_dificultad_respirar"
          value={state.experimento_dificultad_respirar}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="¿Ha experimentado dificultad para respirar, mareos, desmayos o pérdida del conocimiento?"
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div>

      {/* ¿Tiene una presión arterial sistólica mayor que 140 o diastólica mayor que 90? */}
      <div className="col-12">
        <label className="control-label pt-2">
          ¿Tiene una presión arterial sistólica mayor que 140 o diastólica mayor
          que 90?
        </label>
        <select
          className="form-control myInput"
          name="presion_arterial_sistolica_diastolica"
          value={state.presion_arterial_sistolica_diastolica}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="¿Tiene una presión arterial sistólica mayor que 140 o diastólica mayor que 90?"
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div>

      {/* ¿Alguna vez le han diagnosticado o tratado alguna enfermedad cardíaca, soplo cardíaco, dolor en el pecho, arritmias o ataque cardíaco? */}
      <div className="col-12">
        <label className="control-label pt-2">
          ¿Alguna vez le han diagnosticado o tratado alguna enfermedad cardíaca,
          soplo cardíaco, dolor en el pecho (angina), arritmias (latido
          irregular) o ataque cardíaco?
        </label>
        <select
          className="form-control myInput"
          name="enfermedad_cardiaca"
          value={state.enfermedad_cardiaca}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="¿Alguna vez le han diagnosticado o tratado alguna enfermedad cardíaca, soplo cardíaco, dolor en el pecho, arritmias o ataque cardíaco?"
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div>

      {/* ¿Alguna vez ha tenido una cirugía de corazón, angioplastia o marcapasos, reemplazo de válvula o trasplante de corazón? */}
      <div className="col-12">
        <label className="control-label pt-2">
          ¿Alguna vez ha tenido una cirugía de corazón, angioplastia o
          marcapasos, reemplazo de válvula o trasplante de corazón?
        </label>
        <select
          className="form-control myInput"
          name="cirugia_corazon"
          value={state.cirugia_corazon}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="¿Alguna vez ha tenido una cirugía de corazón, angioplastia o marcapasos, reemplazo de válvula o trasplante de corazón?"
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div>

      {/* ¿Tiene un pulso en reposo mayor a 100 latidos por minuto? */}
      <div className="col-12">
        <label className="control-label pt-2">
          ¿Tiene un pulso en reposo mayor a 100 latidos por minuto?
        </label>
        <select
          className="form-control myInput"
          name="pulso_mayor_100"
          value={state.pulso_mayor_100}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="¿Tiene un pulso en reposo mayor a 100 latidos por minuto?"
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div>

      {/* ¿Tiene artritis, problemas de espalda, cadera / rodilla / coyunturas / dolor o cualquier otra afección ósea o articular que podría agravarse o empeorar con la prueba de capacidad de trabajo? */}
      <div className="col-12">
        <label className="control-label pt-2">
          ¿Tiene artritis, problemas de espalda, cadera / rodilla / coyunturas /
          dolor o cualquier otra afección ósea o articular que podría agravarse
          o empeorar con la prueba de capacidad de trabajo?
        </label>
        <select
          className="form-control myInput"
          name="problemas_afeccion_osea"
          value={state.problemas_afeccion_osea}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="¿Tiene artritis, problemas de espalda, cadera / rodilla / coyunturas / dolor o cualquier otra afección ósea o articular que podría agravarse o empeorar con la prueba de capacidad de trabajo?"
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div>

      {/* ¿Tiene usted experiencia personal o consejos del médico de cualquier otra razón médica o física que le prohibiría tomar el examen de capacidad de trabajo? */}
      <div className="col-12">
        <label className="control-label pt-2">
          ¿Tiene usted experiencia personal o consejos del médico de cualquier
          otra razón médica o física que le prohibiría realizar la prueba de la
          mochila nivel arduo?
        </label>
        <select
          className="form-control myInput"
          name="experiencia_personal_consejos"
          value={state.experiencia_personal_consejos}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="¿Tiene usted experiencia personal o consejos del médico de cualquier otra razón médica o física que le prohibiría realizar la prueba de la mochila nivel arduo?"
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div>

      {/* ¿Su médico personal le recomendó no realizar la prueba de trabajo arduo debido a asma, diabetes, epilepsia o colesterol elevado o una hernia? */}
      <div className="col-12">
        <label className="control-label pt-2">
          ¿Su médico personal le recomendó no realizar la prueba de trabajo
          arduo debido a asma, diabetes, epilepsia o colesterol elevado o una
          hernia?
        </label>
        <select
          className="form-control myInput"
          name="medico_personal_recomendo"
          value={state.medico_personal_recomendo}
          onChange={setInfo}
          onBlur={revisarFormulario}
          placeholder="¿Su médico personal le recomendó no realizar la prueba de trabajo arduo debido a asma, diabetes, epilepsia o colesterol elevado o una hernia?"
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div>

      {/* ¿Cuenta con el esquema completo de COVID-19? */}
      {/* <div className="col-12">
        <label className="control-label pt-2">
          ¿Cuenta con el esquema completo de COVID-19?
        </label>
        <select
          className="form-control myInput"
          name="esquema_completo"
          value={state?.data?.esquema_completo}
          onChange={handleChange}
          onBlur={revisarFormulario}
        >
          <option value="">---Seleccione---</option>
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </select>
      </div> */}

      {/** ¿Cuenta con la dosis de refuerzo? */}
      {/* {state?.data?.esquema_completo === "1" && <React.Fragment>
        <div className="col-12">
          <label className="control-label pt-2">
            ¿Cuenta con dosis de refuerzo?
          </label>
          <select
            className="form-control myInput"
            name="refuerzo"
            value={state?.data?.refuerzo}
            onChange={handleChange}
          >
            <option value="">---Seleccione---</option>
            <option value={1}>Si</option>
            <option value={0}>No</option>
          </select>
        </div> */}

        {/* ¿Fue vacunado con alguna de las siguientes marcas de vacunas válidas para viajar a  Estados Unidos y Canadá (Pfizer-BioNTech, Moderna, AstraZeneca SINOVAC y Johnson & Johnson)?*/}

        {/* <div className="col-12">
          <label className="control-label pt-2">
            ¿Fue vacunado con alguna de las siguientes marcas de vacunas válidas para viajar a  Estados Unidos y Canadá (Pfizer-BioNTech, Moderna, AstraZeneca SINOVAC y Johnson & Johnson)?
          </label>
          <select
            className="form-control myInput"
            name="vacuna_aprobada"
            value={state?.data?.vacuna_aprobada}
            onChange={handleChange}
            onBlur={revisarFormulario}
          >
            <option value="">---Seleccione---</option>
            <option value={1}>Si</option>
            <option value={0}>No</option>
          </select>
        </div> */}

        {/* {state?.data?.vacuna_aprobada === "1" && <React.Fragment> */}
          {/* Certificado de vacunación COVID-19 (2 DÓSIS) */}
          {/* <div className="col-12 col-md-12">
            <label className="control-label pt-2">Certificado de vacunación COVID-19 (2 DÓSIS)</label>
            <input
              className="form-control myInput"
              name="certificado_covid"
              type="file"
              accept="application/pdf"
              onChange={setInfo}
              placeholder="Cargar"
            />
          </div>

          {files.certificado_covid_fl && <React.Fragment> */}

            {/** Marca de la vacuna primera dosis */}
            {/* <div className="col-12 col-md-4">
              <label className="control-label pt-2">Marca de la Vacuna</label>
              <SelectVacuna
                className={`form-control myInput`}
                name="idPrimeraDosis"
                value={state?.data?.idPrimeraDosis ? state?.data?.idPrimeraDosis : null}
                value={state?.data?.idPrimeraDosis}
                onChange={handleChange}
              />
            </div> */}

            {/* Fecha de aplicación de 1 dosis */}
            {/* <div className="col-12 col-md-4">
              <label className="control-label pt-2">
                Fecha aplicación 1 dosis
              </label>
              <input
                className="form-control myInput"
                name="fecha_primera_dosis"
                value={state?.data?.fecha_primera_dosis}
                type="date"
                onChange={handleChange}
              />
            </div> */}

            {/* Fecha de aplicación de 2 dosis */}

            {/* {state?.data?.idPrimeraDosis && isUnique(state?.data?.idPrimeraDosis) &&
              <div className="col-12 col-md-4">
                <label className="control-label pt-2">
                  Fecha aplicación 2 dosis
                </label>
                <input
                  className="form-control myInput"
                  name="fecha_segunda_dosis"
                  value={state?.data?.fecha_segunda_dosis}
                  type="date"
                  onChange={handleChange}
                />
              </div>} */}

            {/* Certificado de dosis de refuerzo */}
            {/* {state?.data?.refuerzo === "1" && <React.Fragment>
              <div className="col-12 col-md-12">
                <label className="control-label pt-2">Certificado de dosis de Refuerzo</label>
                <input
                  className="form-control myInput"
                  name="certificado_covid_refuerzo"
                  type="file"
                  accept="application/pdf"
                  onChange={setInfo}
                  placeholder="Cargar"
                />
              </div> */}


              {/** Marca de la vacuna */}

              {/* <div className="col-12 col-md-6">
                <label className="control-label pt-2">Marca de la Vacuna</label>
                <SelectVacuna
                  className={`form-control myInput`}
                  name="idRefuerzoDosis"
                  value={state?.data?.idRefuerzoDosis ? state?.data?.idRefuerzoDosis : null}
                  value={state?.data?.idRefuerzoDosis}
                  onChange={handleChange}
                />
              </div> */}

              {/* Fecha de aplicación de dosis de refuerzo */}
              {/* <div className="col-12 col-md-6">
                <label className="control-label pt-2">
                  Fecha aplicación dosis de refuerzo
                </label>
                <input
                  className="form-control myInput"
                  name="fecha_refuerzo_dosis"
                  value={state?.data?.fecha_refuerzo_dosis}
                  type="date"
                  onChange={handleChange}
                />
              </div>

            </React.Fragment>} */}

            {/* ¿Ha padecido COVID-19 en los últimos 6 meses? */}
            {/* <div className="col-12">
              <label className="control-label pt-2">
                ¿Ha padecido COVID-19 en los últimos 6 meses?
              </label>
              <select
                className="form-control myInput"
                name="padecimiento"
                value={state?.data?.padecimiento}
                onChange={handleChange}
              >
                <option value="">---Seleccione---</option>
                <option value={1}>Si</option>
                <option value={0}>No</option>
              </select>
            </div> */}

            {/* ¿Requirió hospitalización cuando padeció COVID-19? */}
            {/* {state?.data?.padecimiento === "1" &&
              <div className="col-12">
                <label className="control-label pt-2">
                  ¿Requirió hospitalización cuando padeció COVID-19?
                </label>
                <select
                  className="form-control myInput"
                  name="hospitalizacion"
                  value={state?.data?.hospitalizacion}
                  onChange={handleChange}
                >
                  <option value="">---Seleccione---</option>
                  <option value={1}>Si</option>
                  <option value={0}>No</option>
                </select>
              </div>}
          </React.Fragment>} 
        </React.Fragment>} 
      </React.Fragment>}  */}
      {/* BTN Continuar */}
      <div className="col-12 pt-5 btn-margin">
        <button
          className="btn btn-primary"
          // onClick={revisarFormulario}
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

export default S3;
