import React, { useState } from 'react'
import Swal from 'sweetalert2'
import S1 from '../captura/S1';
import S3 from '../captura/S3';
import S2 from '../captura/S2';
import S4 from '../captura/S4';
import S5 from '../captura/S5';
import S6 from '../captura/S6';
import S7 from '../captura/S7';
import S8 from '../captura/S8';
import Finalizar from '../captura/Finalizar';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

const API_REQUEST = ''

const MesaAyuda = () => {
    const [infoBrigadista, setInfoBrigadista] = useState({})

    const [archivos, setArchivos] = useState({})

    const [secciones, setSecciones] = useState({
        s1: { status: 'faltante', visible: !false },
        s2: { status: 'faltante', visible: !false },
        s3: { status: 'faltante', visible: !false },
        s4: { status: 'faltante', visible: !false },
        s5: { status: 'faltante', visible: !false },
        s6: { status: 'faltante', visible: !false },
        s7: { status: 'faltante', visible: !false },
        s8: { status: 'faltante', visible: !false },
    })

    const seccionCompleta = { status: 'completo', visible: false };
    const seccionSiguiente = { status: 'actual', visible: true };




    const [rechazo, setRechazo] = useState({
        rechazo: false,
        motivo_rechazo: null
    })

    const msgFaltanCampos = () => {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son necesarios'
        })
    }

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
            correo_beneficiario } = infoBrigadista
        /* que no falte ningun dato */
        if (
            !anios_experiencia ||
            !apellido_paterno ||
            !apellido_materno ||
            !nombres ||
            !curp ||
            !fecha_nacimiento ||
            !sexo ||
            !rfc ||
            !estado ||
            !municipio ||
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
            !correo_beneficiario || !archivos.fotografia_fl
        ) {
            msgFaltanCampos()
            return
        }
        const url = `${API_REQUEST}create_candidato`;
        try {

            const formData = new FormData();
            formData.append("file", archivos.fotografia_fl[0]);
            formData.append("curp", infoBrigadista.curp);
            formData.append("name", "fotografia");

            const archivo = await axios.post(`${API_REQUEST}carga_archivo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const respuesta = await axios.post(url, infoBrigadista);
            if (respuesta.status === 200 && archivo.status === 200) {
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
                    })
                    // se muestra pantalla motivo de rechazo
                    setRechazo({
                        rechazo: true,
                        motivo_rechazo: infoBrigadista.motivo_rechazo
                    })
                } else {
                    /*  axios actualizacion de INFOCandidato */
                    setSecciones({
                        ...secciones,
                        s1: seccionCompleta,
                        s2: seccionSiguiente,
                    })
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Este candidato ya fué registrado.'
                })
                return
            }
            console.error('error', error);
        }
        /*  mostrar siguiente seccion*/
    }
    const checkDataS2 = async () => {
        const {
            pasaporte_numero,
            pasaporte_fecha_cad,
            documento_viajar_canada,
            eta_visa_num,
            eta_visa_fecha_exp,
            eta_visa_fecha_cad,
            tipo_licencia,
            licencia_fecha_cad } = infoBrigadista
        const { pasaporte_archivo_fl, eta_visa_archivo_fl, licencia_manejo_fl } = archivos
        /* revision de campos vacíos */
        if (
            !pasaporte_numero || !pasaporte_fecha_cad ||
            !documento_viajar_canada || !eta_visa_num || !eta_visa_fecha_exp ||
            !eta_visa_fecha_cad || !tipo_licencia || !licencia_fecha_cad ||
            !pasaporte_archivo_fl || !eta_visa_archivo_fl ||
            !licencia_manejo_fl
        ) {
            msgFaltanCampos()
            return
        }

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
        /* LICENCIA_MANEJO */
        const formData_licencia_manejo = new FormData();
        formData_licencia_manejo.append("file", archivos.licencia_manejo_fl[0]);
        formData_licencia_manejo.append("curp", infoBrigadista.curp);
        formData_licencia_manejo.append("name", "licencia_manejo");




        /*   actualizacion de informacion por AXIOS */
        const url = `${API_REQUEST}candidato_update`;

        try {
            const archivo_pasaporte_archivo = await axios.post(`${API_REQUEST}carga_archivo`, formData_pasaporte_archivo, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const archivo_eta_visa_archivo = await axios.post(`${API_REQUEST}carga_archivo`, formData_eta_visa_archivo, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const archivo_licencia_manejo = await axios.post(`${API_REQUEST}carga_archivo`, formData_licencia_manejo, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const respuesta = await axios.post(url, infoBrigadista);

            if (
                respuesta.status === 200 &&
                archivo_pasaporte_archivo.status === 200 &&
                archivo_eta_visa_archivo.status === 200 &&
                archivo_licencia_manejo.status === 200
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
                    })
                    // se muestra pantalla motivo de rechazo
                    setRechazo({
                        rechazo: true,
                        motivo_rechazo: infoBrigadista.motivo_rechazo
                    })
                } else {
                    setSecciones({
                        ...secciones,
                        s2: seccionCompleta,
                        s3: seccionSiguiente,
                    })
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se encontró candidato'
                })
                return
            }
            console.error('error', error);
        }

    }
    const checkDataS3 = async () => {
        const { sexo,
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
        } = infoBrigadista

        const { cert_toxicologico_fl, cert_medico_fl } = archivos

        if (
            !sexo || !altura || !peso || !imc || !grupo_sanguineo ||
            !cert_toxicologico_fl || !fecha_cert_toxicologico || !cert_medico_fl ||
            !fecha_cert_medico || !padece_enfermedad || !requiere_medicamentos_perm ||
            !experimento_dolor_pecho || !experimento_dificultad_respirar
            || !presion_arterial_sistolica_diastolica || !enfermedad_cardiaca ||
            !cirugia_corazon || !pulso_mayor_100 || !problemas_afeccion_osea ||
            !experiencia_personal_consejos || !medico_personal_recomendo
        ) {

            msgFaltanCampos()
            return
        }

        const formData_cert_toxicologico = new FormData();
        formData_cert_toxicologico.append("file", archivos.cert_toxicologico_fl[0]);
        formData_cert_toxicologico.append("curp", infoBrigadista.curp);
        formData_cert_toxicologico.append("name", 'cert_toxicologico');

        const formData_cert_medico = new FormData();
        formData_cert_medico.append("file", archivos.cert_medico_fl[0]);
        formData_cert_medico.append("curp", infoBrigadista.curp);
        formData_cert_medico.append("name", 'cert_medico');
        const url = `${API_REQUEST}candidato_update`;
        try {
            /*  actualizacion de informacion por AXIOS */
            const archivo_cert_toxicologico = await axios.post(`${API_REQUEST}carga_archivo`, formData_cert_toxicologico, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const archivo_cert_medico = await axios.post(`${API_REQUEST}carga_archivo`, formData_cert_medico, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const respuesta = await axios.post(url, infoBrigadista);

            if (respuesta.status === 200 && archivo_cert_toxicologico.status === 200 && archivo_cert_medico.status === 200) {
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
                    })
                    // se muestra pantalla motivo de rechazo
                    setRechazo({
                        rechazo: true,
                        motivo_rechazo: infoBrigadista.motivo_rechazo
                    })
                } else {
                    setSecciones({
                        ...secciones,
                        s3: seccionCompleta,
                        s4: seccionSiguiente,
                    })
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se encontró candidato'
                })
                return
            }
            console.error('error', error);
        }
    }
    const checkDataS4 = async () => {
        /* update AXIOS */
        const url = `${API_REQUEST}candidato_update`;
        try {

            const formData_sci_smi_100_fl = new FormData();
            formData_sci_smi_100_fl.append("file", archivos.sci_smi_100_fl[0]);
            formData_sci_smi_100_fl.append("curp", infoBrigadista.curp);
            formData_sci_smi_100_fl.append("name", 'sci_smi_100');

            const archivo_sci_smi_100 = await axios.post(`${API_REQUEST}carga_archivo`, formData_sci_smi_100_fl, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            const formData_sci_smi_200_fl = new FormData();
            formData_sci_smi_200_fl.append("file", archivos.sci_smi_200_fl[0]);
            formData_sci_smi_200_fl.append("curp", infoBrigadista.curp);
            formData_sci_smi_200_fl.append("name", 'sci_smi_200');

            const archivo_sci_smi_200 = await axios.post(`${API_REQUEST}carga_archivo`, formData_sci_smi_200_fl, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            const respuesta = await axios.post(url, infoBrigadista);

            if (respuesta.status === 200 && archivo_sci_smi_100.status === 200 && archivo_sci_smi_200.status === 200) {
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
                    })
                    // se muestra pantalla motivo de rechazo
                    setRechazo({
                        rechazo: true,
                        motivo_rechazo: infoBrigadista.motivo_rechazo
                    })
                } else {
                    setSecciones({
                        ...secciones,
                        s4: seccionCompleta,
                        s5: seccionSiguiente,
                    })
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se encontró candidato'
                })
                return
            }
            console.error('error', error);
        }
    }
    const checkDataS5 = async () => {
        /* update AXIOS */

        const formData_s_190_fl = new FormData();
        formData_s_190_fl.append("file", archivos.s_190_fl[0]);
        formData_s_190_fl.append("curp", infoBrigadista.curp);
        formData_s_190_fl.append("name", 's_190');

        const formData_s_130_fl = new FormData();
        formData_s_130_fl.append("file", archivos.s_130_fl[0]);
        formData_s_130_fl.append("curp", infoBrigadista.curp);
        formData_s_130_fl.append("name", 's_130');

        const url = `${API_REQUEST}candidato_update`;

        try {
            const respuesta = await axios.post(url, infoBrigadista);
            const archivo_s_190 = await axios.post(`${API_REQUEST}carga_archivo`, formData_s_190_fl, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const archivo_s_130 = await axios.post(`${API_REQUEST}carga_archivo`, formData_s_130_fl, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (respuesta.status === 200 && archivo_s_190.status === 200 && archivo_s_130.status === 200) {

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
                    })
                    // se muestra pantalla motivo de rechazo
                    setRechazo({
                        rechazo: true,
                        motivo_rechazo: infoBrigadista.motivo_rechazo
                    })
                } else {

                    setSecciones({
                        ...secciones,
                        s5: seccionCompleta,
                        s6: seccionSiguiente,
                    })
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se encontró candidato'
                })
                return
            }
            console.error('error', error);
        }

    }
    const checkDataS6 = async () => {
        const { opera_autonoma_gps, opera_autonoma_mark3, opera_autonoma_motosierra } = infoBrigadista

        if (!opera_autonoma_gps || !opera_autonoma_mark3 || !opera_autonoma_motosierra) {
            msgFaltanCampos()
            return
        }
        /* actualizacion de informacion por AXIOS */
        const url = `${API_REQUEST}candidato_update`;
        try {

            const respuesta = await axios.post(url, infoBrigadista);

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
                    })
                    /* Muestra ppantalla de rechazo */
                    setRechazo({
                        rechazo: true,
                        motivo_rechazo: infoBrigadista.motivo_rechazo
                    })
                } else {
                    setSecciones({
                        ...secciones,
                        s6: seccionCompleta,
                        s7: seccionSiguiente,
                    })
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se encontró candidato'
                })
                return
            }
            console.error('error', error);
        }

    }
    const checkDataS7 = async () => {

        const {
            antecedentes_fecha,
            tiene_epp_completo,
            tiene_mochila_linea,
            tiene_duffel_bag,
            tiene_casa_campania,
            tiene_sleeping_bag,
            tiene_sleeping_pad } = infoBrigadista
        const { carta_antecedentes_fl } = archivos

        if (
            !antecedentes_fecha ||
            !carta_antecedentes_fl ||
            !tiene_epp_completo ||
            !tiene_mochila_linea ||
            !tiene_duffel_bag ||
            !tiene_casa_campania ||
            !tiene_sleeping_bag ||
            !tiene_sleeping_pad
        ) {

            msgFaltanCampos()
            return
        }

        /* CARTA_ANTECEDENTES */
        const formData_carta_antecedentes = new FormData();
        formData_carta_antecedentes.append("file", archivos.carta_antecedentes_fl[0]);
        formData_carta_antecedentes.append("curp", infoBrigadista.curp);
        formData_carta_antecedentes.append("name", "carta_antecedentes");


        const url = `${API_REQUEST}candidato_update`;
        try {
            const archivo_carta_antecedentes = await axios.post(`${API_REQUEST}carga_archivo`, formData_carta_antecedentes, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const respuesta = await axios.post(url, infoBrigadista);
            if (respuesta.status === 200 && archivo_carta_antecedentes.status === 200) {
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
                    })
                    // se muestra pantalla motivo de rechazo
                    setRechazo({
                        rechazo: true,
                        motivo_rechazo: infoBrigadista.motivo_rechazo
                    })
                } else {
                    setSecciones({
                        ...secciones,
                        s7: seccionCompleta,
                        s8: seccionSiguiente,
                    })
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se encontró candidato'
                })
                return
            }
            console.error('error', error);
        }

    }
    const checkDataS8 = async () => {
        const { nivel_ingles, toeic_toefl, l_280, s_290, cert_intern_incendios, cert_intern_ate_emerg_med, examen_toeic_toefl_punt, examen_toeic_toefl_archivo, posicion_candidato } = infoBrigadista


        if (posicion_candidato === 'jefe_de_cuadrilla' || posicion_candidato === 'tecnico') {
            if (!nivel_ingles || !toeic_toefl || !examen_toeic_toefl_punt || !examen_toeic_toefl_archivo ||
                !l_280 || !s_290 || !cert_intern_incendios || !cert_intern_ate_emerg_med
            ) {
                msgFaltanCampos()
                return
            }
        } else {
            if (
                !l_280 || !s_290 || !cert_intern_incendios || !cert_intern_ate_emerg_med
            ) {
                msgFaltanCampos()
                return
            }
        }

        const formData_examen_toeic_toefl_archivo_fl = new FormData();
        formData_examen_toeic_toefl_archivo_fl.append("file", archivos.examen_toeic_toefl_archivo_fl[0]);
        formData_examen_toeic_toefl_archivo_fl.append("curp", infoBrigadista.curp);
        formData_examen_toeic_toefl_archivo_fl.append("name", infoBrigadista.toeic_toefl);

        const formData_l_280_file_fl = new FormData();
        formData_l_280_file_fl.append("file", archivos.l_280_file_fl[0]);
        formData_l_280_file_fl.append("curp", infoBrigadista.curp);
        formData_l_280_file_fl.append("name", 'l_280_file');

        const formData_s_290_file_fl = new FormData();
        formData_s_290_file_fl.append("file", archivos.s_290_file_fl[0]);
        formData_s_290_file_fl.append("curp", infoBrigadista.curp);
        formData_s_290_file_fl.append("name", 's_290_file');

        const formData_cert_intern_incendios_file_fl = new FormData();
        formData_cert_intern_incendios_file_fl.append("file", archivos.cert_intern_incendios_file_fl[0]);
        formData_cert_intern_incendios_file_fl.append("curp", infoBrigadista.curp);
        formData_cert_intern_incendios_file_fl.append("name", 'cert_intern_incendios_file');

        const formData_cert_intern_ate_emerg_med_file_fl = new FormData();
        formData_cert_intern_ate_emerg_med_file_fl.append("file", archivos.cert_intern_ate_emerg_med_file_fl[0]);
        formData_cert_intern_ate_emerg_med_file_fl.append("curp", infoBrigadista.curp);
        formData_cert_intern_ate_emerg_med_file_fl.append("name", 'cert_intern_ate_emerg_med_file');


        const url = `${API_REQUEST}candidato_update`;
        try {

            // eslint-disable-next-line no-unused-vars
            const archivo_examen_toeic_toefl_archivo_fl = await axios.post(`${API_REQUEST}carga_archivo`, formData_examen_toeic_toefl_archivo_fl, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const archivo_l_280_file_fl = await axios.post(`${API_REQUEST}carga_archivo`, formData_l_280_file_fl, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const archivo_s_290_file_fl = await axios.post(`${API_REQUEST}carga_archivo`, formData_s_290_file_fl, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const archivo_cert_intern_incendios_file_fl = await axios.post(`${API_REQUEST}carga_archivo`, formData_cert_intern_incendios_file_fl, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const archivo_cert_intern_ate_emerg_med_file_fl = await axios.post(`${API_REQUEST}carga_archivo`, formData_cert_intern_ate_emerg_med_file_fl, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const respuesta = await axios.post(url, infoBrigadista);

            if (
                respuesta.status === 200 &&
                archivo_l_280_file_fl.status === 200 &&
                archivo_s_290_file_fl.status === 200 &&
                archivo_cert_intern_incendios_file_fl.status === 200 &&
                archivo_cert_intern_ate_emerg_med_file_fl.status === 200
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
                    })
                    // se muestra pantalla motivo de rechazo
                    setRechazo({
                        rechazo: true,
                        motivo_rechazo: infoBrigadista.motivo_rechazo
                    })
                } else {
                    setSecciones({
                        ...secciones,
                        s8: seccionCompleta
                    })
                    Swal.fire(
                        'Buen trabajo',
                        'Se le notificará sobre su proceso de seleccion',
                        'success'
                    )
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se encontró candidato'
                })
                return
            }
            console.error('error', error);
        }

    }

    return (
        <div className='container'>
            {secciones.s1.visible && <React.Fragment>
                <Alert variant='warning'>
                    <h1>S1</h1><b>Validaciones:</b>
                    <ul>
                        <li>Candidato menor de edad</li>
                    </ul>
                </Alert>
                <S1
                    state={infoBrigadista}
                    setState={setInfoBrigadista}
                    checkData={checkDataS1}
                    files={archivos}
                    setStateFiles={setArchivos}
                />
            </React.Fragment>
            }

            {secciones.s2.visible && <React.Fragment>
                <Alert variant='warning'>
                    <h1>S2</h1><b>Validaciones:</b>
                    <ul>
                        <li>Pasaporte vence en menos de 10 meses</li>
                        <li>Eta/visa vence en menos de 10 meses</li>
                    </ul>

                </Alert>
                <S2
                    state={infoBrigadista}
                    setState={setInfoBrigadista}
                    checkData={checkDataS2}
                    files={archivos}
                    setStateFiles={setArchivos}
                />
            </React.Fragment>
            }

            {secciones.s3.visible && <React.Fragment>
                <Alert variant='warning'>
                    <h1>S3</h1><b>Validaciones:</b>
                    <ul>
                        <li>IMC mayo 30</li>
                        <li>Certificado toxicológico excede los 15 dias</li>
                        <li>Certificado médico excede 1 mes</li>
                        <li>Problemas de salud (cualquier variable si)</li>
                    </ul>
                </Alert>
                <S3
                    state={infoBrigadista}
                    setState={setInfoBrigadista}
                    checkData={checkDataS3}
                    files={archivos}
                    setStateFiles={setArchivos}
                />
            </React.Fragment>
            }
            {secciones.s4.visible && <React.Fragment>
                <Alert variant='warning'>
                    <h1>S4</h1><b>Validaciones:</b>
                    <ul>
                        <li>No aprobo examen smi_100</li>
                    </ul>

                </Alert>
                <S4
                    state={infoBrigadista}
                    setState={setInfoBrigadista}
                    checkData={checkDataS4}
                    files={archivos}
                    setStateFiles={setArchivos}
                />
            </React.Fragment>
            }
            {secciones.s5.visible && <React.Fragment>
                <Alert variant='warning'>
                    <h1>S5</h1><b>Validaciones:</b>
                    <ul>
                        <li>No aprobo examen si_190</li>
                    </ul>

                </Alert>
                <S5
                    state={infoBrigadista}
                    setState={setInfoBrigadista}
                    checkData={checkDataS5}
                    files={archivos}
                    setStateFiles={setArchivos}
                />
            </React.Fragment>
            }
            {secciones.s6.visible && <React.Fragment>
                <Alert variant='warning'>
                    <h1>S6</h1><b>Validaciones:</b>
                    <ul>
                        <li>No domina GPS</li>
                        <li>No domina Motobomba Mark 3</li>
                    </ul>

                </Alert>
                <S6
                    state={infoBrigadista}
                    setState={setInfoBrigadista}
                    checkData={checkDataS6}
                    files={archivos}
                    setStateFiles={setArchivos}
                />
            </React.Fragment>
            }
            {secciones.s7.visible && <React.Fragment>
                <Alert variant='warning'>
                    <h1>S7</h1><b>Validaciones:</b>
                    <ul>
                        <li>Carta de antecedentes mayor a 2 meses</li>
                        <li>No cuenta con equipo completo</li>
                    </ul>

                </Alert>
                <S7
                    state={infoBrigadista}
                    setState={setInfoBrigadista}
                    checkData={checkDataS7}
                    files={archivos}
                    setStateFiles={setArchivos}
                />
            </React.Fragment>
            }
            {secciones.s8.visible && <React.Fragment>
                <Alert variant='warning'>
                    <h1>S8</h1><b>OBSERVACIONES:</b>
                    <ul>
                        <li><b>Tecnico y jefe de brigada SOLO presenta variables de idioma (TEFL/TOEIC)</b></li>
                    </ul>

                </Alert>
                <S8
                    state={infoBrigadista}
                    setState={setInfoBrigadista}
                    checkData={checkDataS8}
                    files={archivos}
                    setStateFiles={setArchivos}
                />
            </React.Fragment>
            }
            {/* {rechazo.rechazo && <Finalizar />} */}
            {rechazo.rechazo && <Finalizar state={infoBrigadista} />}
        </div>
    );
}

export default MesaAyuda;
