import React, { useState, useEffect, useContext } from "react";
import PDF from "./PDF";
// import moduleName from 'module'
// import { GrDocumentPdf } from 'react-icons/gr';
// import { IconContext } from "react-icons";
import candidatoContext from "../../context/candidato/candidatoContext";
import { isEmpty } from "lodash";
const Finalizar = (props) => {
  const candidatos = useContext(candidatoContext);
  const [state,] = useState(candidatos.candidatos.infoBrigadista);
  const { photo } = props;
  const [mensaje, setMensaje] = useState("");
  const [puesto, setPuesto] = useState("");
  let ventana = window;
  const [secciones, setSecciones] = useState({
    pasaporte_vigente: false,
    documento_para_viajar_a_canad: false,
    licencia_de_manejo: false,
    indice_de_masa_corporal: false,
    salud: false,
    conocimiento_y_experiencia_sci: false,
    conocimiento_y_experiencia_en_incendios: false,
    buena_conducta: false,
    disponibilidad_en_condiciones_ambientales_adversas: false,
    capacidad_para_comunicarse_en_ingles: false,
    liderazgo: false,
    aptitud_fisica: false,
    gps: false,
    motobomba_mark_iii: false,
    motosierra_autonoma: false,
    avenza_maps: false
  });
  const [showPDF, setShowPDF] = useState(false);

  const getMensaje = (motivo) => {
    switch (motivo) {
      case "candidato menor de edad":
        setMensaje(
          "No es posible continuar con el proceso debido a que la edad mínima requerida es de 21 años"
        );
        break;

      case "pasaporte vence en menos de 10 meses":
        setMensaje(
          "No es posible continuar ya que no cumple con la vigencia de 10 meses del  Pasaporte"
        );
        setSecciones({
          pasaporte_vigente: false,
          documento_para_viajar_a_canad: false,
          licencia_de_manejo: false,
          indice_de_masa_corporal: false,
          salud: false,
          conocimiento_y_experiencia_sci: false,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "eta/visa vence en menos de 10 meses":
        setMensaje(
          "No es posible continuar ya que no cumple con la vigencia de 10 meses de eTA/VISA"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: false,
          licencia_de_manejo: false,
          indice_de_masa_corporal: false,
          salud: false,
          conocimiento_y_experiencia_sci: false,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "imc mayo 30":
        setMensaje(
          "No es posible continuar con el proceso debido a que su IMC es superior a 29.9"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: false,
          salud: false,
          conocimiento_y_experiencia_sci: false,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "certificado toxicológico excede los 15 dias":
        setMensaje(
          "No es posible continuar con el proceso debido a que la fecha de su Certificado toxicológico es mayor a 15 días"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: false,
          conocimiento_y_experiencia_sci: false,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "certificado médico excede 1 mes":
        setMensaje(
          "No es posible continuar con el proceso debido a que la fecha de su Certificado médico es mayor a 1 mes"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: false,
          conocimiento_y_experiencia_sci: false,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "problemas de salud":
        setMensaje(
          "No es posible continuar con el proceso debido a el resultado de  su  evaluación. No le permite cumplir los requisitos minimos para realizar la prueba de la mochila nivel arduo."
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: false,
          conocimiento_y_experiencia_sci: false,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "No cuenta con el esquema de vacunación completo":
        setMensaje(
          "No es posible continuar con el proceso ya que no cuenta con el esquema de vacunación COVID-19 completo."
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: false,
          conocimiento_y_experiencia_sci: false,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;
        break;

      case "no aprobo examen smi_100":
        setMensaje(
          "No es posible continuar con el proceso debido a que no aprobó con el 70% minimo del examen de conocimientos del SCI 100-200 requerido"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: true,
          conocimiento_y_experiencia_sci: false,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "no aprobo examen si_190":
        setMensaje(
          "No es posible continuar con el proceso debido a que no aprobó con el 70% minimo del examen de conocimientos del S-190, S-130"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: true,
          conocimiento_y_experiencia_sci: true,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "no cuenta con constancia de disponibilidad":
        setMensaje(
          "No es posible continuar con el proceso debido que no cuenta con la evaluación de disponibilidad"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: true,
          conocimiento_y_experiencia_sci: true,
          conocimiento_y_experiencia_en_incendios: false,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "carta de antecedentes mayor a 2 meses":
        setMensaje(
          "No es posible continuar con el proceso debido a que la fecha del documento es mayor a 2 meses"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: true,
          conocimiento_y_experiencia_sci: true,
          conocimiento_y_experiencia_en_incendios: true,
          buena_conducta: false,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "falta de habilidad o competencia":
        setMensaje(
          "No es posible continuar con el proceso debido a que la operación autónoma del GPS y Bomba Mark 3, es una condicionante requerida"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: true,
          conocimiento_y_experiencia_sci: true,
          conocimiento_y_experiencia_en_incendios: true,
          buena_conducta: true,
          disponibilidad_en_condiciones_ambientales_adversas: true,
          capacidad_para_comunicarse_en_ingles: true,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case "no cuenta con equipo completo":
        setMensaje(
          "No es posible continuar con el proceso debido a que no cuenta con el equipo mínimo requerido para su trabajo en condiciones ambientales adversas"
        );
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: true,
          conocimiento_y_experiencia_sci: true,
          conocimiento_y_experiencia_en_incendios: true,
          buena_conducta: true,
          disponibilidad_en_condiciones_ambientales_adversas: false,
          capacidad_para_comunicarse_en_ingles: false,
          liderazgo: false,
          aptitud_fisica: false,
          gps: false,
          motobomba_mark_iii: false,
          motosierra_autonoma: false,
          avenza_maps: false
        });
        break;

      case null:
        setMensaje("finalizó");
        setSecciones({
          pasaporte_vigente: true,
          documento_para_viajar_a_canad: true,
          licencia_de_manejo: true,
          indice_de_masa_corporal: true,
          salud: true,
          conocimiento_y_experiencia_sci: true,
          conocimiento_y_experiencia_en_incendios: true,
          buena_conducta: true,
          disponibilidad_en_condiciones_ambientales_adversas: true,
          capacidad_para_comunicarse_en_ingles: true,
          liderazgo: true,
          aptitud_fisica: true,
          gps: true,
          motobomba_mark_iii: true,
          motosierra_autonoma: true,
          avenza_maps: true
        });
        break;

      default:
        break;
    }
  };

  const getPuesto = () => {
    switch (state.posicion_candidato) {
      case "combatiente":
        setPuesto("Combatiente");
        break;

      case "jefe_de_cuadrilla":
        setPuesto("Jefe de cuadrilla");
        break;

      case "jefe_de_brigada":
        setPuesto("Jefe de brigada");
        break;

      case "tecnico":
        setPuesto("Técnico");
        break;

      default:
        setPuesto("");
        break;
    }
  };

  const mostrarPDF = () => {
    ventana.open("https://forms.gle/NJEvVV8gefLFYADj8", "encuesta", "_blank");
    setShowPDF(true);
  };

  useEffect(() => {
    getMensaje(state.motivo_rechazo);
    getPuesto();
  }, [mensaje, puesto, state]);
  return (
    <>
      <div className="container pb-4">
        {!isEmpty(mensaje) && mensaje !== "finalizó" ? (
          <div>
            <h1>
              <strong>Motivo de Rechazo</strong>
            </h1>
            <h2>{mensaje}</h2>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h1>Finalizó su proceso de registro</h1>
            <h3>
              ¡¡¡ Prepárese para atender la convocatoria para realizar las
              pruebas físicas y de habilidades!!!
            </h3>
            <br />
            <br />
            <p>
              Debera presentarse con documentos anexados en original para su
              cotejo y el equipo requerido para trabajar en condiciones
              ambientales adversas en la fecha y hora que le sera notificada por
              la Promotoría de Desarrollo Forestal de la Comision Nacional
              Forestal en su Estado.
            </p>
          </div>
        )}
        <div className="py-3" style={{ textAlign: "center" }}>
          <button className="btn btn-success mr-2" onClick={mostrarPDF}>
            Obtener Constancia
          </button>
        </div>
      </div>
      {showPDF && (
        <PDF
          sections={secciones}
          puesto={puesto}
          photo={photo}
          state={state}
          mensaje={mensaje}
        />
      )}
    </>
  );
};

export default Finalizar;
