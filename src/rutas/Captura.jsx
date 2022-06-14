import React, { useState, useContext, useEffect } from "react";
import imagen_persona from "../assets/user.svg";
import Swal from "sweetalert2";
import S1 from "../components/captura/S1";
import S3 from "../components/captura/S3";
import S2 from "../components/captura/S2";
import S4 from "../components/captura/S4";
import S5 from "../components/captura/S5";
import S6 from "../components/captura/S6";
import S7 from "../components/captura/S7";
import S8 from "../components/captura/S8";
import Finalizar from "../components/captura/Finalizar";
import axios from "axios";
import AlertError from "../singles/AlertError";
import AlertCargando from "../singles/AlertCargando";
import AlertExito from "../singles/AlertExito";
import Login from "../components/captura/Login";
// import rfcValido from '../helpers/rfcValido'

/* CONTEXT */

import candidatoContext from "./../context/candidato/candidatoContext";
import emailValid from "../helpers/emailValid";
// import axiosClient from "../config/axios";
import { formatDate } from "../helpers/formatDate";
const API_REQUEST = process.env.REACT_APP_BACKEN_URL;

const Captura = () => {
  const candidatos = useContext(candidatoContext);

  const [infoBrigadista, setInfoBrigadista] = useState(
    candidatos.candidatos.infoBrigadista
  );
  // const [infoBrigadista, setInfoBrigadista] = useState()
  const [archivos, setArchivos] = useState({});

  const [secciones, setSecciones] = useState({
    login: { status: "faltante", visible: !false },
    s1: { status: "faltante", visible: false },
    s2: { status: "faltante", visible: false },
    s3: { status: "faltante", visible: false },
    s4: { status: "faltante", visible: false },
    s5: { status: "faltante", visible: false },
    s6: { status: "faltante", visible: false },
    s7: { status: "faltante", visible: false },
    s8: { status: "faltante", visible: false },
  });

  const seccionCompleta = { status: "completa", visible: false };
  const seccionSiguiente = { status: "actual", visible: true };

  useEffect(() => {

    if (candidatos.candidatos.infoBrigadista.rechazo) {
      setRechazo({
        rechazo: true,
        motivo_rechazo: infoBrigadista.motivo_rechazo,
      });
    }

    if (secciones.s8.status === "completa") {
      setRechazo({
        rechazo: true,
        motivo_rechazo: null,
      });
    }

    setInfoBrigadista(candidatos.candidatos.infoBrigadista);

    return () => { }

  }, [secciones]);

  const [rechazo, setRechazo] = useState({
    rechazo: false,
    motivo_rechazo: null,
  });

  const msgFaltanCampos = () => {
    // console.log(candidatos);
    Swal.fire({
      icon: "error",
      title: "Todos los campos son necesarios",
    });
  };

  /* VALIDACIONES */
  const checkDataS1 = async () => {
    const {
      anios_experiencia,
      apellido_paterno,
      apellido_materno,
      nombres,
      curp,
      fecha_nacimiento,
      sexo,
      rfc,
      estado,
      municipio,
      aeropuerto,
      numero_telefonico_notificaciones,
      correo_electronico,
      posicion_candidato,
      dependencia,
      tipo_dependencia,
      fecha_ingreso_dependencia,
      puesto_en_dependencia,
      funciones_dependencia,
      nombre_beneficiario,
      telefono_beneficiario,
      correo_beneficiario,
      region,
      talla_camisa,
      talla_sudadera,
      talla_playera,
      talla_pantalon,
      talla_gorras,
      talla_botas,
      // nombre_banco,
      // clabe_interbancaria,
    } = infoBrigadista;
    /* que no falte ningun dato */
    if (
      !anios_experiencia ||
      !region ||
      !apellido_paterno ||
      !apellido_materno ||
      !nombres ||
      !curp ||
      !fecha_nacimiento ||
      !sexo ||
      !rfc ||
      !estado ||
      !municipio ||
      !aeropuerto ||
      !numero_telefonico_notificaciones ||
      !correo_electronico ||
      !posicion_candidato ||
      !dependencia ||
      !tipo_dependencia ||
      !fecha_ingreso_dependencia ||
      !puesto_en_dependencia ||
      !funciones_dependencia ||
      !nombre_beneficiario ||
      !telefono_beneficiario ||
      !correo_beneficiario ||
      !talla_camisa ||
      !talla_playera ||
      !talla_sudadera ||
      !talla_pantalon ||
      !talla_gorras ||
      !talla_botas
      /*!nombre_banco || */
      /* !clabe_interbancaria || */
    ) {
      msgFaltanCampos();
      return;
    }

    if (!archivos.fotografia_fl) {
      AlertError('Error', 'Falta Cargar la fotografia que solo permite los siguientes formatos .png, .jpg, .');
      return;
    }
    if (!archivos.curp_archivo_fl) {
      AlertError('Error', 'Falta Cargar el documento de la CURP en formato PDF.');
      return;
    }

    /* VALIDACION RFC */
    // const rfcToCheck = rfcValido(rfc);
    // if (rfcToCheck !== rfc) {
    //     AlertError('Error', 'El RFC esta mal estructurado')
    //     return
    // }

    /* validacion de los correos */

    if (!emailValid(correo_electronico) || !emailValid(correo_beneficiario)) {
      AlertError("Los correos estan mal estructurados");
      return;
    }

    // cuenta bancaria
    // if (size(clabe_interbancaria) < 18) {
    //   AlertError("El numero de cuenta clabe debe ser igual a 18 digitos");
    //   return;
    // }

    // SE AGREGA A CONTEXT
    candidatos.candidatos.agregarCandidato({
      ...candidatos.candidatos,
      infoBrigadista,
    });

    const url = `${API_REQUEST}candidato_update`;

    try {

      const formData = new FormData();
      formData.append("file", archivos.fotografia_fl[0]);
      formData.append("curp", infoBrigadista.curp);
      formData.append("name", "fotografia");

      const formDataCurp = new FormData();
      formDataCurp.append("file", archivos.curp_archivo_fl[0]);
      formDataCurp.append("curp", infoBrigadista.curp);
      formDataCurp.append("name", "curp_archivo");
      const archivo = await axios.post(`${API_REQUEST}carga_archivo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const archivo_curp = await axios.post(
        `${API_REQUEST}carga_archivo`,
        formDataCurp,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      AlertCargando("Enviando los datos, espere por favor");

      const respuesta = await axios.post(url, {
        data: infoBrigadista,
        secuencia: { ...secciones, s1: seccionCompleta, s2: seccionSiguiente },
      });

      if (
        respuesta.status === 200 &&
        archivo.status === 200 &&
        archivo_curp.status === 200
      ) {
        AlertExito("Cargado exitosamente");
        if (infoBrigadista.rechazo) {
          // se ocultan las secciones
          setSecciones({
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            login: false,
          });
          // se muestra pantalla motivo de rechazo
          setRechazo({
            rechazo: true,
            motivo_rechazo: infoBrigadista.motivo_rechazo,
          });
        } else {
          setSecciones({
            ...secciones,
            s1: seccionCompleta,
            s2: seccionSiguiente,
          });
        }
      } else {
        AlertError("Error", respuesta.data);
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Este candidato ya fué registrado.",
        });
        return;
      }
      AlertError("Error", error);
    }
    /*  mostrar siguiente seccion*/
  };

  const checkDataS2 = async () => {
    const regex = /[A-Z]{1}[0-9]{8}$/;
    const regex_visa_eta = /[A-Z]{1}[0-9]{9}$/;
    const regex_visa = /[A-Z]{1}[0-9]{8}$/;
    const {
      pasaporte_numero,
      pasaporte_fecha_cad,
      documento_viajar_canada,
      eta_visa_num,
      eta_visa_fecha_exp,
      eta_visa_fecha_cad,
      tipo_licencia,
      tiene_licencia,
      tiene_visa_usa,
      visa_usa_num,
      visa_usa_fecha_exp,
      visa_usa_fecha_cad,
      licencia_fecha_cad,
    } = infoBrigadista;
    const {
      pasaporte_archivo_fl,
      eta_visa_archivo_fl,
      licencia_manejo_fl,
      visa_usa_archivo_fl,
    } = archivos;
    /* revision de campos vacíos */
    if (
      !pasaporte_numero ||
      !pasaporte_fecha_cad ||
      !documento_viajar_canada ||
      !eta_visa_num ||
      !eta_visa_fecha_exp ||
      !eta_visa_fecha_cad ||
      !pasaporte_archivo_fl ||
      !eta_visa_archivo_fl
    ) {
      msgFaltanCampos();
      return;
    }

    if (
      tiene_licencia === "1" &&
      (!tipo_licencia || !licencia_fecha_cad || !licencia_manejo_fl)
    ) {
      /* LIMPIEZA DE DATOS */
      msgFaltanCampos();
      return;
    }

    if (
      tiene_visa_usa === "1" &&
      (!visa_usa_num ||
        !visa_usa_fecha_exp ||
        !visa_usa_fecha_cad ||
        !{ visa_usa_archivo_fl })
    ) {
      /* LIMPIEZA DE DATOS */
      msgFaltanCampos();
      return;
    }

    if (!regex.test(pasaporte_numero)) {
      AlertError(
        "Error",
        "El numero pasaporte no cuenta con la estructura correcta."
      );
      return;
    }
    if (!regex_visa_eta.test(eta_visa_num)) {
      AlertError(
        "Error",
        "El numero VISA/eTA no cuenta con la estructura correcta."
      );
      return;
    }
    if (!regex_visa.test(visa_usa_num) && tiene_visa_usa === "1") {
      AlertError(
        "Error",
        "El numero de la VISA Americana no cuenta con la estructura correcta."
      );
      return;
    }

    // SE AGREGA A CONTEXT
    candidatos.candidatos.agregarCandidato({
      ...candidatos.candidatos,
      infoBrigadista,
    });

    /* PASAPORTE_ARCHIVO */
    const formData_pasaporte_archivo = new FormData();
    formData_pasaporte_archivo.append("file", archivos.pasaporte_archivo_fl[0]);
    formData_pasaporte_archivo.append("curp", infoBrigadista.curp);
    formData_pasaporte_archivo.append("name", "pasaporte_archivo");

    /* ETA_VISA_ARCHIVO */
    const formData_eta_visa_archivo = new FormData();
    formData_eta_visa_archivo.append("file", archivos.eta_visa_archivo_fl[0]);
    formData_eta_visa_archivo.append("curp", infoBrigadista.curp);
    formData_eta_visa_archivo.append("name", infoBrigadista.documento_viajar_canada);

    const formData_licencia_manejo = new FormData();

    if (tiene_licencia === "1") {

      /* LICENCIA_MANEJO */
      formData_licencia_manejo.append("file", archivos.licencia_manejo_fl[0]);
      formData_licencia_manejo.append("curp", infoBrigadista.curp);
      formData_licencia_manejo.append("name", "licencia_manejo");

    }

    const formData_visa_usa = new FormData();

    if (tiene_visa_usa === "1") {

      /* VISA ESTADOUNIDENSE */
      formData_visa_usa.append("file", archivos.visa_usa_archivo_fl[0]);
      formData_visa_usa.append("curp", infoBrigadista.curp);
      formData_visa_usa.append("name", "visa_estadounidense");

    }

    /*   actualizacion de informacion por AXIOS */
    const url = `${API_REQUEST}candidato_update`;

    try {
      const archivo_pasaporte_archivo = await axios.post(
        `${API_REQUEST}carga_archivo`,
        formData_pasaporte_archivo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const archivo_eta_visa_archivo = await axios.post(
        `${API_REQUEST}carga_archivo`,
        formData_eta_visa_archivo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (tiene_licencia === "1") {
        const archivo_licencia_manejo = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_licencia_manejo,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (archivo_licencia_manejo.status !== 200) {
          AlertError("Error", "no se pudo cargar el archivo de licencia");
        }
      }

      if (tiene_visa_usa === "1") {
        const archivo_visa_usa = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_visa_usa,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (archivo_visa_usa.status !== 200) {
          AlertError(
            "Error",
            "no se pudo cargar el archivo de la visa americana"
          );
        }
      }

      AlertCargando("Enviando los datos, espere por favor");
      const respuesta = await axios.post(url, {
        data: infoBrigadista,
        secuencia: {
          ...secciones,
          s2: seccionCompleta,
          s3: seccionSiguiente,
        },
      });

      AlertExito("Cargado exitosamente");
      if (
        respuesta.status === 200 &&
        archivo_pasaporte_archivo.status === 200 &&
        archivo_eta_visa_archivo.status === 200
      ) {

        if (infoBrigadista.rechazo) {
          // se ocultan las secciones
          setSecciones({
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            login: false,
          });

          // se muestra pantalla motivo de rechazo
          setRechazo({
            rechazo: true,
            motivo_rechazo: infoBrigadista.motivo_rechazo,
          });

        } else {
          /* Agrega al context general */

          setSecciones({
            ...secciones,
            s2: seccionCompleta,
            s3: seccionSiguiente,
          });

        }
      }
    } catch (error) {

      if (error.response.status === 400) {

        Swal.fire({
          icon: "error",
          title: "No se encontró candidato",
        });

        return;

      }

      console.error("error", error);

    }
  };

  const checkDataS3 = async () => {
    const {
      sexo,
      altura,
      peso,
      imc,
      grupo_sanguineo,
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
    } = infoBrigadista;

    const { cert_toxicologico_fl, cert_medico_fl, certificado_covid_fl, certificado_covid_refuerzo_fl } = archivos;

    if (
      !sexo ||
      !altura ||
      !peso ||
      !imc ||
      !grupo_sanguineo ||
      grupo_sanguineo === "" ||
      !cert_toxicologico_fl ||
      !fecha_cert_toxicologico ||
      !cert_medico_fl ||
      !fecha_cert_medico ||
      !padece_enfermedad ||
      !requiere_medicamentos_perm ||
      !experimento_dolor_pecho ||
      !experimento_dificultad_respirar ||
      !presion_arterial_sistolica_diastolica ||
      !enfermedad_cardiaca ||
      !cirugia_corazon ||
      !pulso_mayor_100 ||
      !problemas_afeccion_osea ||
      !experiencia_personal_consejos ||
      !medico_personal_recomendo ||
      !data.esquema_completo === "" ||
      (data.esquema_completo === "1" && !data.refuerzo === "") ||
      (data.esquema_completo === "1" && !data.vacuna_aprobada === "") ||
      (data.vacuna_aprobada === "1" && !certificado_covid_fl) ||
      (data.vacuna_aprobada === "1" && !data.idPrimeraDosis === "") ||
      (data.vacuna_aprobada === "1" && !data.fecha_primera_dosis === "") ||
      (data.vacuna_aprobada === "1" && !data.padecimineto === "")
    ) {
      msgFaltanCampos();
      return;
    }

    // SE AGREGA A CONTEXT
    candidatos.candidatos.agregarCandidato({
      ...candidatos.candidatos,
      infoBrigadista,
    });

    const formData_cert_toxicologico = new FormData();
    formData_cert_toxicologico.append("file", archivos.cert_toxicologico_fl[0]);
    formData_cert_toxicologico.append("curp", infoBrigadista.curp);
    formData_cert_toxicologico.append("name", "cert_toxicologico");

    const formData_cert_medico = new FormData();
    formData_cert_medico.append("file", archivos.cert_medico_fl[0]);
    formData_cert_medico.append("curp", infoBrigadista.curp);
    formData_cert_medico.append("name", "cert_medico");

    const formDtaa_certificado_covid = new FormData();

    if (certificado_covid_fl) {
      formDtaa_certificado_covid.append("file", archivos.certificado_covid_fl[0]);
      formDtaa_certificado_covid.append("curp", infoBrigadista.curp);
      formDtaa_certificado_covid.append("name", "certificado_covid");
    }

    const formDtaa_certificado_covid_refuerzo = new FormData();

    if (certificado_covid_refuerzo_fl) {

      formDtaa_certificado_covid_refuerzo.append("file", archivos.certificado_covid_refuerzo_fl[0]);
      formDtaa_certificado_covid_refuerzo.append("curp", infoBrigadista.curp);
      formDtaa_certificado_covid_refuerzo.append("name", "certificado_covid_refuerzo");

    }

    const url = `${API_REQUEST}candidato_update`;

    try {
      /*  actualizacion de informacion por AXIOS */
      const archivo_cert_toxicologico = await axios.post(
        `${API_REQUEST}carga_archivo`,
        formData_cert_toxicologico,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const archivo_cert_medico = await axios.post(
        `${API_REQUEST}carga_archivo`,
        formData_cert_medico,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      let archivo_certificado_covid = null;
      if (certificado_covid_fl) {

        archivo_certificado_covid = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formDtaa_certificado_covid,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      let archivo_certificado_covid_refuerzo = null;
      if (certificado_covid_refuerzo_fl) {
        archivo_certificado_covid_refuerzo = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formDtaa_certificado_covid_refuerzo,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      AlertCargando("Enviando los datos, espere por favor");
      const respuesta = await axios.post(url, {
        data: infoBrigadista,
        secuencia: {
          ...secciones,
          s3: seccionCompleta,
          s4: seccionSiguiente,
        },
      });

      AlertExito("Cargado exitosamente");
      if (
        respuesta.status === 200 &&
        archivo_cert_toxicologico.status === 200 &&
        archivo_cert_medico.status === 200 ||
        archivo_certificado_covid?.status === 200 ||
        archivo_certificado_covid_refuerzo?.status === 200
      ) {
        if (infoBrigadista.rechazo) {
          // se ocultan las secciones
          setSecciones({
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            login: false,
          });
          // se muestra pantalla motivo de rechazo
          setRechazo({
            rechazo: true,
            motivo_rechazo: infoBrigadista.motivo_rechazo,
          });
        } else {
          /* Agrega al context general */

          setSecciones({
            ...secciones,
            s3: seccionCompleta,
            s4: seccionSiguiente,
          });



        }
      } else {
        AlertError("Error", respuesta.data);
      }
    } catch (error) {

      if (error.response.status === 400) {

        Swal.fire({
          icon: "error",
          title: "No se encontró candidato",
        });

        return;
      }

      console.error("error", error);
    }
  };
  const checkDataS4 = async () => {
    // SE AGREGA A CONTEXT
    if (!archivos.sci_smi_100_fl[0] || !archivos.sci_smi_200_fl[0]) {
      msgFaltanCampos();
      return;
    }

    candidatos.candidatos.agregarCandidato({
      ...candidatos.candidatos,
      infoBrigadista,
    });

    /* update AXIOS */
    const url = `${API_REQUEST}candidato_update`;

    try {
      const formData_sci_smi_100_fl = new FormData();
      formData_sci_smi_100_fl.append("file", archivos.sci_smi_100_fl[0]);
      formData_sci_smi_100_fl.append("curp", infoBrigadista.curp);
      formData_sci_smi_100_fl.append("name", "sci_smi_100");

      const archivo_sci_smi_100 = await axios.post(
        `${API_REQUEST}carga_archivo`,
        formData_sci_smi_100_fl,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const formData_sci_smi_200_fl = new FormData();
      formData_sci_smi_200_fl.append("file", archivos.sci_smi_200_fl[0]);
      formData_sci_smi_200_fl.append("curp", infoBrigadista.curp);
      formData_sci_smi_200_fl.append("name", "sci_smi_200");

      const archivo_sci_smi_200 = await axios.post(
        `${API_REQUEST}carga_archivo`,
        formData_sci_smi_200_fl,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (archivos.sci_smi_300_fl) {

        const formData_sci_smi_300_fl = new FormData();
        formData_sci_smi_300_fl.append("file", archivos.sci_smi_300_fl[0]);
        formData_sci_smi_300_fl.append("curp", infoBrigadista.curp);
        formData_sci_smi_300_fl.append("name", "sci_smi_300");

        await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_sci_smi_300_fl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      const respuesta = await axios.post(url, {
        data: infoBrigadista,
        secuencia: {
          ...secciones,
          s4: seccionCompleta,
          s5: seccionSiguiente,
        },
      });

      if (
        respuesta.status === 200 &&
        archivo_sci_smi_100.status === 200 &&
        archivo_sci_smi_200.status === 200
      ) {
        if (infoBrigadista.rechazo) {
          // se ocultan las secciones
          setSecciones({
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            login: false,
          });
          // se muestra pantalla motivo de rechazo
          setRechazo({
            rechazo: true,
            motivo_rechazo: infoBrigadista.motivo_rechazo,
          });
        } else {
          /* Agrega al context general */

          setSecciones({
            ...secciones,
            s4: seccionCompleta,
            s5: seccionSiguiente,
          });
        }
      } else {
        AlertError("Error", respuesta.data);
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "No se encontró candidato",
        });
        return;
      }
      console.error("error", error);
    }
  };

  const checkDataS5 = async () => {

    // SE AGREGA A CONTEXT
    candidatos.candidatos.agregarCandidato({
      ...candidatos.candidatos,
      infoBrigadista,
    });
    /* update AXIOS */

    const formData_s_190_fl = new FormData();
    formData_s_190_fl.append("file", archivos.s_190_fl[0]);
    formData_s_190_fl.append("curp", infoBrigadista.curp);
    formData_s_190_fl.append("name", "s_190");

    const formData_s_130_fl = new FormData();
    formData_s_130_fl.append("file", archivos.s_130_fl[0]);
    formData_s_130_fl.append("curp", infoBrigadista.curp);
    formData_s_130_fl.append("name", "s_130");

    const url = `${API_REQUEST}candidato_update`;

    try {
      const respuesta = await axios.post(url, {
        data: infoBrigadista,
        secuencia: {
          ...secciones,
          s5: seccionCompleta,
          s6: seccionSiguiente,
        },
      });
      const archivo_s_190 = await axios.post(
        `${API_REQUEST}carga_archivo`,
        formData_s_190_fl,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const archivo_s_130 = await axios.post(
        `${API_REQUEST}carga_archivo`,
        formData_s_130_fl,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (
        respuesta.status === 200 &&
        archivo_s_190.status === 200 &&
        archivo_s_130.status === 200
      ) {

        if (infoBrigadista.rechazo) {

          // se ocultan las secciones
          setSecciones({
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            login: false,
          });

          // se muestra pantalla motivo de rechazo
          setRechazo({
            rechazo: true,
            motivo_rechazo: infoBrigadista.motivo_rechazo,
          });

        } else {

          /* Agrega al context general */
          setSecciones({
            ...secciones,
            s5: seccionCompleta,
            s6: seccionSiguiente,
          });

        }
      } else {

        AlertError("Error", respuesta.data);

      }
    } catch (error) {
      if (error.response.status === 400) {

        Swal.fire({
          icon: "error",
          title: "No se encontró candidato",
        });

        return;

      }
      console.error("error", error);
    }
  };
  const checkDataS6 = async () => {
    const {
      opera_autonoma_gps,
      opera_autonoma_mark3,
      opera_autonoma_motosierra,
      conocimientos_primeros_auxilios,
      niv_primeros_auxilios,
      conocimiento_equipo_aereo,
      examen_equipo_aereo
    } = infoBrigadista;
    const { doc_acred_primeros_auxilios_fl, constancia_operaciones_aereas_fl } = archivos;

    if (
      !opera_autonoma_gps ||
      !opera_autonoma_mark3 ||
      !opera_autonoma_motosierra ||
      !conocimientos_primeros_auxilios === "" ||
      (conocimientos_primeros_auxilios === "1" &&
      (!niv_primeros_auxilios || !doc_acred_primeros_auxilios_fl)) ||
      conocimiento_equipo_aereo === "" ||
      !examen_equipo_aereo != ""
    ) {

      msgFaltanCampos();
      return;

    }

    const formData_doc_acred_primeros_auxilios_fl = new FormData();

    if (doc_acred_primeros_auxilios_fl) {

      formData_doc_acred_primeros_auxilios_fl.append("file", archivos.doc_acred_primeros_auxilios_fl[0]);
      formData_doc_acred_primeros_auxilios_fl.append("curp", infoBrigadista.curp);
      formData_doc_acred_primeros_auxilios_fl.append("name", "doc_acred_primeros_auxilios");

    }

    const formData_constancia_operaciones_aereas_fl = new FormData();


    if (constancia_operaciones_aereas_fl) {

      formData_constancia_operaciones_aereas_fl.append("file", archivos.doc_acred_primeros_auxilios_fl[0]);
      formData_constancia_operaciones_aereas_fl.append("curp", infoBrigadista.curp);
      formData_constancia_operaciones_aereas_fl.append("name", "constancia_operaciones_aereas");
    }

    // SE AGREGA A CONTEXT
    candidatos.candidatos.agregarCandidato({
      ...candidatos.candidatos,
      infoBrigadista,
    });

    /* actualizacion de informacion por AXIOS */
    const url = `${API_REQUEST}candidato_update`;

    try {

      AlertCargando("Enviando los datos, espere por favor");

      const respuesta = await axios.post(url, {
        data: infoBrigadista,
        secuencia: { ...secciones, s6: seccionCompleta, s7: seccionSiguiente },
      });

      AlertExito("Cargado exitosamente");
      if (doc_acred_primeros_auxilios_fl) {

        const archivo_doc_acred_primeros_auxilios_fl = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_doc_acred_primeros_auxilios_fl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (archivo_doc_acred_primeros_auxilios_fl.status !== 200) {
          AlertError(
            "no se pudo cargar archivo",
            "doc_acred_primeros_auxilios"
          );
        }

      }

      if (constancia_operaciones_aereas_fl) {

        const archivo_constancia_operaciones_aereas_fl = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_constancia_operaciones_aereas_fl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (archivo_constancia_operaciones_aereas_fl.status !== 200) {

          AlertError(
            "no se pudo cargar archivo",
            "constancia_operaciones_aereas"
          );

        }
      }


      if (respuesta.status === 200) {

        if (infoBrigadista.rechazo) {

          // se ocultan las secciones
          setSecciones({
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            login: false,
          });

          /* Muestra ppantalla de rechazo */
          setRechazo({
            rechazo: true,
            motivo_rechazo: infoBrigadista.motivo_rechazo,
          });

        } else {

          /* Agrega al context general */
          setSecciones({
            ...secciones,
            s6: seccionCompleta,
            s7: seccionSiguiente,
          });

        }
      } else {

        AlertError("Error", respuesta.data);

      }
    } catch (error) {

      if (error.response.status === 400) {

        Swal.fire({
          icon: "error",
          title: "No se encontró candidato",
        });

        return;
      }

      console.error("error", error);
    }
  };

  const checkDataS7 = async () => {

    const { antecedentes_fecha, tiene_epp_completo, calificacion_evaluacion_disponibilidad } = infoBrigadista;
    const { carta_antecedentes_fl, evaluacion_disponibilidad_fl } = archivos;

    if ((evaluacion_disponibilidad_fl && !calificacion_evaluacion_disponibilidad === "") ||
      (calificacion_evaluacion_disponibilidad && !carta_antecedentes_fl) ||
      (calificacion_evaluacion_disponibilidad && !antecedentes_fecha) ||
      (calificacion_evaluacion_disponibilidad && !tiene_epp_completo === "")) {
      msgFaltanCampos();
      return;
    }


    // SE AGREGA A CONTEXT
    candidatos.candidatos.agregarCandidato({
      ...candidatos.candidatos,
      infoBrigadista,
    });

    /* CARTA_ANTECEDENTES */
    const formData_evaluacion_disponibilidad = new FormData();
    if (evaluacion_disponibilidad_fl) {
      formData_evaluacion_disponibilidad.append("file", archivos.evaluacion_disponibilidad_fl[0]);
      formData_evaluacion_disponibilidad.append("curp", infoBrigadista.curp);
      formData_evaluacion_disponibilidad.append("name", "evaluacion_disponibilidad");
    }


    const formData_carta_antecedentes = new FormData();

    if (carta_antecedentes_fl) {
      formData_carta_antecedentes.append("file", archivos.carta_antecedentes_fl[0]);
      formData_carta_antecedentes.append("curp", infoBrigadista.curp);
      formData_carta_antecedentes.append("name", "carta_antecedentes");
    }


    const url = `${API_REQUEST}candidato_update`;

    try {

      let archivo_evaluacion_disponibilidad = null;

      if (evaluacion_disponibilidad_fl) {
        archivo_evaluacion_disponibilidad = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_evaluacion_disponibilidad,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      let archivo_carta_antecedentes = null;
      if (carta_antecedentes_fl) {

        archivo_carta_antecedentes = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_carta_antecedentes,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }


      AlertCargando("Enviando los datos, espere por favor");

      const respuesta = await axios.post(url, {
        data: evaluacion_disponibilidad_fl ? infoBrigadista : {
          ...infoBrigadista,
          rechazo: true,
          motivo_rechazo: "no cuenta con constancia de disponibilidad",
          fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0),
        },
        secuencia: { ...secciones, s7: seccionCompleta, s8: seccionSiguiente },
      });

      if (
        respuesta.status === 200 ||
        archivo_evaluacion_disponibilidad?.status === 200 ||
        archivo_carta_antecedentes?.status === 200
      ) {

        AlertExito("Cargado exitosamente");
        if (infoBrigadista.rechazo) {
          // se ocultan las secciones
          setSecciones({
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            login: false,
          });

          // se muestra pantalla motivo de rechazo
          setRechazo({
            rechazo: true,
            motivo_rechazo: infoBrigadista.motivo_rechazo,
          });

        } else {
          /* Agrega al context general */

          setSecciones({
            ...secciones,
            s7: seccionCompleta,
            s8: seccionSiguiente,
          });

        }
      } else {

        AlertError("Error", respuesta.data);

      }
    } catch (error) {

      if (error.response.status === 400) {

        Swal.fire({
          icon: "error",
          title: "No se encontró candidato",
        });

        return;
      }

      console.error("error", error);
    }
  };

  const checkDataS8 = async () => {

    const {
      nivel_ingles,
      toeic_toefl,
      l_280,
      s_290,
      cert_intern_incendios,
      cert_intern_ate_emerg_med,
      examen_toeic_toefl_punt,
      posicion_candidato,
      tiene_certificado_ingles,
    } = infoBrigadista;

    const {
      examen_toeic_toefl_archivo_fl,
      l_280_file_fl,
      s_290_file_fl,
      s_211_file_fl,
      cert_intern_incendios_file_fl,
      cert_intern_ate_emerg_med_file_fl,
    } = archivos;

    if (
      posicion_candidato === "jefe_de_brigada" ||
      posicion_candidato === "tecnico"
    ) {
      /* si es jefe de brigada o tecnico, debe tener las variables de idioma */
      if (
        !nivel_ingles ||
        !tiene_certificado_ingles === "" ||
        (tiene_certificado_ingles === "1" &&
          (!toeic_toefl ||
            !examen_toeic_toefl_punt ||
            !examen_toeic_toefl_archivo_fl)) ||
        (l_280 === "1" && !l_280_file_fl) ||
        (s_290 === "1" && !s_290_file_fl) ||
        (cert_intern_incendios === "1" && !cert_intern_incendios_file_fl) ||
        (cert_intern_ate_emerg_med === "1" &&
          !cert_intern_ate_emerg_med_file_fl)
      ) {

        msgFaltanCampos();
        return;

      }
      if (examen_toeic_toefl_archivo_fl) {

        const formData_examen_toeic_toefl_archivo_fl = new FormData();
        formData_examen_toeic_toefl_archivo_fl.append("file", archivos.examen_toeic_toefl_archivo_fl[0]);
        formData_examen_toeic_toefl_archivo_fl.append("curp", infoBrigadista.curp);
        formData_examen_toeic_toefl_archivo_fl.append("name", infoBrigadista.toeic_toefl);

      }
    } else {

      // SI tiene s1, debe cargar los archivos, o responder algo
      if ((l_280 === "1" && !l_280_file_fl) ||
        l_280 === "" ||
        (s_290 === "1" && !s_290_file_fl) ||
        s_290 === "" ||
        (cert_intern_incendios === "1" && !cert_intern_incendios_file_fl) ||
        cert_intern_incendios === "" ||
        (cert_intern_ate_emerg_med === "1" &&
          !cert_intern_ate_emerg_med_file_fl) ||
        cert_intern_ate_emerg_med === ""
      ) {
        msgFaltanCampos();
        return;
      }
    }
    // SE AGREGA A CONTEXT
    candidatos.candidatos.agregarCandidato({
      ...candidatos.candidatos,
      infoBrigadista,
    });

    const formData_examen_toeic_toefl_archivo_fl = new FormData();
    const formData_l_280_file_fl = new FormData();
    const formData_s_290_file_fl = new FormData();
    const formData_s_211_file_fl = new FormData();
    const formData_cert_intern_incendios_file_fl = new FormData();
    const formData_cert_intern_ate_emerg_med_file_fl = new FormData();

    if (examen_toeic_toefl_archivo_fl) {

      formData_examen_toeic_toefl_archivo_fl.append("file", archivos.examen_toeic_toefl_archivo_fl[0]);
      formData_examen_toeic_toefl_archivo_fl.append("curp", infoBrigadista.curp);
      formData_examen_toeic_toefl_archivo_fl.append("name", infoBrigadista.toeic_toefl);

    }

    if (l_280_file_fl) {

      formData_l_280_file_fl.append("file", archivos.l_280_file_fl[0]);
      formData_l_280_file_fl.append("curp", infoBrigadista.curp);
      formData_l_280_file_fl.append("name", "l_280_file");

    }

    if (s_290_file_fl) {

      formData_s_290_file_fl.append("file", archivos.s_290_file_fl[0]);
      formData_s_290_file_fl.append("curp", infoBrigadista.curp);
      formData_s_290_file_fl.append("name", "s_290_file");

    }

    if (cert_intern_incendios_file_fl) {

      formData_cert_intern_incendios_file_fl.append(
        "file",
        archivos.cert_intern_incendios_file_fl[0]
      );

      formData_cert_intern_incendios_file_fl.append(
        "curp",
        infoBrigadista.curp
      );

      formData_cert_intern_incendios_file_fl.append(
        "name",
        "cert_intern_incendios_file"
      );
    }

    if (s_211_file_fl) {

      formData_s_211_file_fl.append("file", archivos.s_211_file_fl[0]);
      formData_s_211_file_fl.append("curp", infoBrigadista.curp);
      formData_s_211_file_fl.append("name", "s_211_file");

    }

    if (cert_intern_ate_emerg_med_file_fl) {

      formData_cert_intern_ate_emerg_med_file_fl.append(
        "file",
        archivos.cert_intern_ate_emerg_med_file_fl[0]
      );

      formData_cert_intern_ate_emerg_med_file_fl.append(
        "curp",
        infoBrigadista.curp
      );

      formData_cert_intern_ate_emerg_med_file_fl.append(
        "name",
        "cert_intern_ate_emerg_med_file"
      );

    }

    const url = `${API_REQUEST}candidato_update`;
    try {

      setSecciones({
        ...secciones,
        s8: seccionCompleta,
      });

      if (examen_toeic_toefl_archivo_fl) {

        const archivo_examen_toeic_toefl_archivo_fl = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_examen_toeic_toefl_archivo_fl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (archivo_examen_toeic_toefl_archivo_fl.status !== 200) {
          AlertError("no se pudo cargar archivo", "examen_toeic_toefl_ar");
        }
      }
      if (l_280_file_fl) {

        const archivo_l_280_file_fl = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_l_280_file_fl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (archivo_l_280_file_fl.status !== 200) {
          AlertError("no se pudo cargar archivo", "l_280");
        }

      }

      if (s_211_file_fl) {

        const archivo_s_211_file_fl = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_s_211_file_fl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (archivo_s_211_file_fl.status !== 200) {
          AlertError("no se pudo cargar archivo", "l_280");
        }

      }

      if (s_290_file_fl) {

        const archivo_s_290_file_fl = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_s_290_file_fl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (archivo_s_290_file_fl.status !== 200) {
          AlertError("no se pudo cargar archivo", "s_290");
        }

      }
      if (cert_intern_incendios_file_fl) {

        const archivo_cert_intern_incendios_file_fl = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_cert_intern_incendios_file_fl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (archivo_cert_intern_incendios_file_fl.status !== 200) {
          AlertError("no se pudo cargar archivo", "cert_intern_incendios");
        }

      }

      if (cert_intern_ate_emerg_med_file_fl) {

        const archivo_cert_intern_ate_emerg_med_file_fl = await axios.post(
          `${API_REQUEST}carga_archivo`,
          formData_cert_intern_ate_emerg_med_file_fl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (archivo_cert_intern_ate_emerg_med_file_fl.status !== 200) {
          AlertError("no se pudo cargar archivo", "cert_intern_ate_emerg_med");
        }

      }

      const respuesta = await axios.post(url, {
        data: { ...infoBrigadista, fechaCreacion: formatDate(new Date().toString().toUpperCase(), 0) },
        secuencia: {
          login: seccionCompleta,
          s1: seccionCompleta,
          s2: seccionCompleta,
          s3: seccionCompleta,
          s4: seccionCompleta,
          s5: seccionCompleta,
          s6: seccionCompleta,
          s7: seccionCompleta,
          s8: seccionCompleta,
        },
      });

      if (respuesta.status === 200) {

        if (infoBrigadista.rechazo) {

          // se ocultan las secciones
          setSecciones({
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            login: false,
          });

          // se muestra pantalla motivo de rechazo
          setRechazo({
            rechazo: true,
            motivo_rechazo: infoBrigadista.motivo_rechazo,
          });

        } else {

          /* Agrega al context general */
          Swal.fire(
            "Buen trabajo",
            "Se le notificará sobre su proceso de seleccion",
            "success"
          );

          setRechazo({
            rechazo: true,
            motivo_rechazo: null,
          });

        }
      } else {
        AlertError("Error", respuesta.data);
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "No se encontró candidato",
        });
        return;
      }
      console.error("error", error);
    }
  };

  return (
    <>
      <div className="container">
        {candidatos.candidatos.infoBrigadista.curp && (
          <div style={{ textAlign: "right" }}>
            <a
              className="btn btn-info"
              target="_blank"
              rel="noopener noreferrer"
              href={`${process.env.REACT_APP_BACKEN_DOCUMENT}Manual_de_usuario_SISECOIF.pdf`}
            >
              Manual de Usuario
            </a>
          </div>
        )}
        {secciones.login.visible && (
          <Login
            secciones={secciones}
            setSecciones={setSecciones}
            archivos={archivos}
            setArchivos={setArchivos}
          />
        )}
        {secciones.s1.visible && (
          <S1
            state={infoBrigadista}
            setState={setInfoBrigadista}
            checkData={checkDataS1}
            files={archivos}
            setStateFiles={setArchivos}
          />
        )}

        {secciones.s2.visible && (
          <S2
            state={infoBrigadista}
            setState={setInfoBrigadista}
            checkData={checkDataS2}
            files={archivos}
            setStateFiles={setArchivos}
          />
        )}
        {/* S2 y 3 estan cambiados en hoja de requerimientos */}
        {secciones.s3.visible && (
          <S3
            state={infoBrigadista}
            setState={setInfoBrigadista}
            checkData={checkDataS3}
            files={archivos}
            setStateFiles={setArchivos}
          />
        )}
        {secciones.s4.visible && (
          <S4
            state={infoBrigadista}
            setState={setInfoBrigadista}
            checkData={checkDataS4}
            files={archivos}
            setStateFiles={setArchivos}
          />
        )}
        {secciones.s5.visible && (
          <S5
            state={infoBrigadista}
            setState={setInfoBrigadista}
            checkData={checkDataS5}
            files={archivos}
            setStateFiles={setArchivos}
          />
        )}
        {secciones.s6.visible && (
          <S6
            state={infoBrigadista}
            setState={setInfoBrigadista}
            checkData={checkDataS6}
            files={archivos}
            setStateFiles={setArchivos}
          />
        )}
        {secciones.s7.visible && (
          <S7
            state={infoBrigadista}
            setState={setInfoBrigadista}
            checkData={checkDataS7}
            files={archivos}
            setStateFiles={setArchivos}
          />
        )}
        {secciones.s8.visible && (
          <S8
            state={infoBrigadista}
            setState={setInfoBrigadista}
            checkData={checkDataS8}
            files={archivos}
            setStateFiles={setArchivos}
          />
        )}
      </div>
      {/* rechazo.rechazo */}
      {rechazo.rechazo && (
        <Finalizar
          photo={
            archivos.fotografia_fl ? archivos.fotografia_fl[0] : imagen_persona
          }
          state={infoBrigadista}
        />
      )}
    </>
  );
};

export default Captura;
