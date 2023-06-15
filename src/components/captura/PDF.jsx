import React from "react";
import moment from "moment";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo_conafor from "../../assets/logo_cnf_2.png";
import { formatDate } from "../../helpers/formatDate";
//import logo_conafor from '../assets/prueba.jpg'
// Create styles cambio menor
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: "12mm",
    paddingBottom: "8mm",
    paddingLeft: "8mm",
    paddingRight: "8mm",
  },
  sectionTitle: {
    width: "100%",
    maxHeight: "2cm",
  },
  header: {
    fontSize: 25,
    //marginBottom: 20,
    //marginTop: 20,
    textAlign: "center",
    color: "#f6f6f6",
    backgroundColor: "grey",
    padding: "1mm",
    borderRadius: "3pt",
  },
  sectionImgTop: {
    width: "100%",
    position: "relative",
    left: "0",
    marginBottom: "0mm",
    paddingTop: "2mm",
  },
  imageTop: {
    width: "100%",
  },
  sectionImg: {
    width: "20%",
    position: "relative",
    left: "0",
    marginBottom: "40mm",
    paddingTop: "2mm",
  },
  image: {
    width: "100%",
    height: "131px",
    border: "2pt solid #C8C8C8",
    borderRadius: "8pt",
  },
  sectionDatos: {
    width: "80%",
    position: "absolute",
    float: "right",
    right: "8mm",
    top: "49mm",
    paddingLeft: "1cm",
    paddingTop: "2mm",
  },
  DatosInfo: {
    border: "2pt solid #C8C8C8",
    width: "auto",
    borderRadius: "4pt",
    textAlign: "center",
    marginTop: "1pt",
    marginBottom: "1pt",
    fontSize: "12pt",
    paddingTop: "1pt",
    paddingBottom: "1pt",
  },

  sectionRequisitos: {
    width: "50%",
    position: "absolute",
    left: "8mm",
    bottom: "72.1mm",
    paddingBottom: "2mm",
  },
  sectionResultados: {
    width: "50%",
    position: "absolute",
    bottom: "72.1mm",
    right: "8mm",
    paddingBottom: "2mm",
    textAlign: "justify",
  },
  RequisitosInfo: {
    borderBottom: "2pt solid #C8C8C8",
    fontSize: "12pt",
  },
  RequisitosEspecial: {
    borderBottom: "2pt solid #C8C8C8",
    fontSize: "12pt",
    textAlign: "justify",
  },
  RequisitosColor: {
    color: "#256708",
  },
  descText: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 12,
    bottom: "4cm",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    paddingLeft: "1cm",
    paddingRight: "1cm",
  },
  headerDescText: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: "15pt",
    bottom: "5.5cm",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#0f0f0f",
    paddingLeft: "1cm",
    paddingRight: "1cm",
  },
  dateText: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 12,
    bottom: "2cm",
    left: 0,
    right: 0,
    textAlign: "right",
    color: "grey",
    paddingLeft: "1cm",
    paddingRight: "1cm",
  },
});

const aprobadoColor = { color: "#256708" };
const reprobadoColor = { color: "#a83232" };
const blackColor = { color: "#0f0f0f" };

// Create Document Component
const PDF = (props) => {
  const { state, sections, puesto, mensaje } = props;

  return (
    <PDFViewer width={window.innerWidth} height={window.innerHeight}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.sectionImgTop} debug={false}>
            <Image style={styles.imageTop} src={logo_conafor} />
          </View>
          <View style={styles.sectionTitle} debug={false}>
            <Text style={styles.header}>Constancia de registro</Text>
          </View>
          <View style={styles.sectionImg} debug={false}>
            <Image
              style={styles.image}
              src={`${process.env.REACT_APP_BACKEND_URL}obtener_archivo?curp=${state.curp}&filename=${state.fotografia}`}
            />
          </View>
          <View style={styles.sectionDatos} debug={false}>
            <Text style={styles.DatosInfo}>
              {state.apellido_paterno.toLocaleUpperCase()}
            </Text>
            <Text style={styles.DatosInfo}>
              {state.apellido_materno.toLocaleUpperCase()}
            </Text>
            <Text style={styles.DatosInfo}>
              {state.nombres.toLocaleUpperCase()}
            </Text>
            <Text style={styles.DatosInfo}>{"CURP: " + state.curp}</Text>
            <Text style={styles.DatosInfo}>
              {state.peso
                ? "PESO: " + state.peso + " kg"
                : "PESO: No presentado"}
            </Text>
            <Text style={styles.DatosInfo}>
              {state.altura
                ? "ALTURA: " + state.altura + " cm"
                : "ALTURA: No presentado"}
            </Text>
            <Text style={styles.DatosInfo}>{"Puesto: " + puesto}</Text>
            <Text style={styles.DatosInfo}>
              {moment(state.fecha_nacimiento).format("DD-MMM-YYYY")}
            </Text>
            <Text style={styles.DatosInfo}>
              {state.dependencia.toLocaleUpperCase()}
            </Text>
          </View>
          <View
            style={[styles.sectionTitle, styles.sectionTitlePosition2]}
            debug={false}
          >
            <Text style={styles.header}>Requisitos y estándares</Text>
          </View>
          <View style={styles.sectionRequisitos} debug={false}>
            <Text style={styles.RequisitosInfo}>1.- Documentos de identidad</Text>
            <Text style={styles.RequisitosInfo}>
              2.- Documento para viajar a Canadá
            </Text>
            {/* <Text style={styles.RequisitosInfo}>Licencia de manejo</Text> */}
            <Text style={styles.RequisitosInfo}>
              3.- Índice de Masa Corporal
            </Text>
            <Text style={styles.RequisitosInfo}>4.- Estado de salud</Text>
            <Text style={styles.RequisitosInfo}>
              5.- Conocimiento y experiencia SCI
            </Text>
            <Text style={styles.RequisitosInfo}>
              6.- Conocimiento y experiencia en incendios
            </Text>
            <Text style={styles.RequisitosInfo}>
              7.- Buena conducta y equipo de despliegue
            </Text>
            {/* <Text style={styles.RequisitosInfo}>Disponibilidad en condiciones ambientales adversas</Text> */}
            <Text style={styles.RequisitosInfo}>
              8.- Capacidad para comunicarse en inglés
            </Text>
            <Text style={styles.RequisitosInfo}>9.- Liderazgo, comunicación efectiva y capacidad de gestión</Text>
            <Text style={styles.RequisitosInfo}>10.- Aptitud Física Prueba de la Mochila</Text>
            <Text style={styles.RequisitosInfo}>11.- Aptitud Física Prueba de la Carrera</Text>
            <Text style={styles.RequisitosInfo}>12.- Habilidad y Competencia GPS</Text>
            <Text style={styles.RequisitosInfo}>13.- Habilidad y Competencia Avenza Maps</Text>
            <Text style={styles.RequisitosInfo}>14.- Habilidad y Competencia Motobomba Mark III</Text>
            <Text style={styles.RequisitosInfo}>15.- Habilidad y Competencia Motosierra Autonoma</Text>
          </View>
          <View style={styles.sectionResultados} debug={false}>
            <Text
              style={[
                styles.RequisitosInfo,
                sections.pasaporte_vigente ? aprobadoColor : reprobadoColor,
              ]}
            >
              {sections.pasaporte_vigente ? "Aprobado" : "No Aprobado"}
            </Text>
            <Text
              style={[
                styles.RequisitosInfo,
                sections.documento_para_viajar_a_canad
                  ? aprobadoColor
                  : reprobadoColor,
              ]}
            >
              {sections.documento_para_viajar_a_canad
                ? "Aprobado"
                : "No Aprobado"}
            </Text>
            {/* <Text style={[styles.RequisitosInfo, (sections.licencia_de_manejo) ? aprobadoColor : reprobadoColor]}>{(sections.licencia_de_manejo) ? 'Aprobado' : 'No Aprobado'}</Text> */}
            <Text
              style={[
                styles.RequisitosInfo,
                sections.indice_de_masa_corporal
                  ? aprobadoColor
                  : reprobadoColor,
              ]}
            >
              {sections.indice_de_masa_corporal ? "Aprobado" : "No Aprobado"}
            </Text>
            <Text
              style={[
                styles.RequisitosInfo,
                sections.salud ? aprobadoColor : reprobadoColor,
              ]}
            >
              {sections.salud ? "Aprobado" : "No Aprobado"}
            </Text>
            <Text
              style={[
                styles.RequisitosInfo,
                sections.conocimiento_y_experiencia_sci
                  ? aprobadoColor
                  : reprobadoColor,
              ]}
            >
              {sections.conocimiento_y_experiencia_sci
                ? "Aprobado"
                : "No Aprobado"}
            </Text>
            <Text
              style={[
                styles.RequisitosInfo,
                sections.conocimiento_y_experiencia_en_incendios
                  ? aprobadoColor
                  : reprobadoColor,
              ]}
            >
              {sections.conocimiento_y_experiencia_en_incendios
                ? "Aprobado"
                : "No Aprobado"}
            </Text>
            <Text
              style={[
                styles.RequisitosInfo,
                sections.buena_conducta ? aprobadoColor : reprobadoColor,
              ]}
            >
              {sections.buena_conducta ? "Aprobado" : "No Aprobado"}
            </Text>
            {/*<Text style={[styles.RequisitosInfo, (sections.disponibilidad_en_condiciones_ambientales_adversas) ? aprobadoColor : reprobadoColor]}>{(sections.disponibilidad_en_condiciones_ambientales_adversas) ? 'Aprobado' : 'No Aprobado'}</Text>*/}
            {state.tiene_certificado_ingles ? (
              <Text
                style={[
                  styles.RequisitosEspecial,
                  state.tiene_certificado_ingles === "1"
                    ? aprobadoColor
                    : blackColor,
                ]}
              >
                {state.tiene_certificado_ingles === "1"
                  ? "Aprobado"
                  : "Sin Certificado"}
              </Text>
            ) : (
              <Text style={[styles.RequisitosEspecial, blackColor]}>
                {"No Aplica"}
              </Text>
            )}
            <Text
              style={[
                styles.RequisitosInfo,
                sections.liderazgo ? aprobadoColor : reprobadoColor,
              ]}
            >
              {sections.liderazgo ? "Aprobado" : "No Aprobado"}
            </Text>
            <Text
              style={[styles.RequisitosEspecial]}
            >
              {'Realizar la prueba en la Promotoria de su Entidad'}
            </Text>
            <Text
              style={[styles.RequisitosEspecial]}
            >
              {'Realizar la prueba en la Promotoria de su Entidad'}
            </Text>
            <Text
              style={[
                styles.RequisitosEspecial,
                sections.gps ? aprobadoColor : reprobadoColor,
              ]}
            >
              {sections.gps
                ? "Realizar la prueba en la Promotoria de su Entidad"
                : "No Aprobado"}
            </Text>
            <Text
              style={[styles.RequisitosEspecial, sections.avenza_maps ? aprobadoColor : reprobadoColor,]}
            >
              {sections.avenza_maps ? 'Realizar la prueba en la Promotoria de su Entidad' : 'No Aprobado'}
            </Text>
            <Text
              style={[
                styles.RequisitosEspecial,
                sections.motobomba_mark_iii ? aprobadoColor : reprobadoColor,
              ]}
            >
              {sections.motobomba_mark_iii
                ? "Realizar la prueba en la Promotoria de su Entidad"
                : "No Aprobado"}
            </Text>

            <Text
              style={[
                styles.RequisitosEspecial,
                state.opera_autonoma_motosierra === "1"
                  ? aprobadoColor
                  : blackColor,
              ]}
            >
              {state.opera_autonoma_motosierra === "1"
                ? "Realizar la prueba en la Promotoria de su Entidad"
                : "No Aplica"}
            </Text>
          </View>

          {/* NOTAS pie de pagina */}
          {state.rechazo ? (
            <React.Fragment>
              <Text style={styles.headerDescText}>MOTIVO DE RECHAZO</Text>
              <Text
                style={styles.descText}
                render={() =>
                  `${mensaje}, por lo cual los elementos posteriores no fueron evaluados.`
                }
                fixed
              ></Text>
              <Text style={styles.dateText} fixed>
                Fecha de expedición: {state.fechaCreacion ? state.fechaCreacion : formatDate(new Date().toString().toUpperCase(), 0)}
              </Text>
            </React.Fragment>
          ) : (
            <Text style={styles.dateText} fixed>
              Fecha de expedición: {state.fechaCreacion ? state.fechaCreacion : formatDate(new Date().toString().toUpperCase(), 0)}
            </Text>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDF;
