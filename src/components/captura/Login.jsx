import React, { useState, useContext } from "react";
import Registro from "../captura/Registro";
import Ingreso from "./Ingreso";
import TerminosAviso from "./TerminosAviso";
/* CONTEXT */
import candidatoContext from "../../context/candidato/candidatoContext";
import axios from "axios";
import AlertError from "../../singles/AlertError";
import AlertaSiguiente from "../../singles/AlertaSiguiente";
import { obtenerFotografia } from "../../singles/obtenerFotografia";

const Login = (props) => {
  const { secciones, setSecciones, archivos, setArchivos } = props;
  const candidatos = useContext(candidatoContext);

  const [ingreso, setIngreso] = useState(false);
  const [showTerminosCondiciones, setShowTerminosCondiciones] = useState(false);
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const [state, setState] = useState({
    curp_reg: "",
    pass_reg: "",
    comp_pass_reg: "",
    curp_ing: "",
    pass: "",
  });

  const sendTerminos = async () => {
    const url = `${process.env.REACT_APP_BACKEN_URL}create_candidato`;
    const { curp_reg, comp_pass_reg } = state;

    try {
      const respuesta = await axios.post(url, {
        curp: curp_reg,
        pass: comp_pass_reg,
        acuerdo_aviso: aceptarTerminos,
      });

      if (respuesta.status === 200) {
        /* setContext */
        candidatos.candidatos.agregarCandidato({
          ...candidatos.candidatos,
          infoBrigadista: {
            curp: curp_reg,
          },
        });
        /* mostrar secciones */

        setSecciones({
          ...secciones,
          login: { status: "completo", visible: false },
          s1: { status: "actual", visible: true },
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        AlertError("Error", error.response.data.msg);
      } else {
        AlertError("Error", error);
      }
    }
  };

  const checkLogin = async () => {
    const { curp_ing, pass } = state;
    const url = `${process.env.REACT_APP_BACKEN_URL}get_candidato`;

    try {
      const respuesta = await axios.post(url, { curp: curp_ing, pass: pass });
      console.log(respuesta.data["fotografia"]);
      if (respuesta.status === 200) {
        setArchivos({
          ...archivos,
          fotografia_fl: [
            `${process.env.REACT_APP_BACKEN_URL}get_photo_candidato?curp=${curp_ing}&filename=${respuesta.data.datafotografia}`,
          ],
        });

        candidatos.candidatos.agregarCandidato({
          ...candidatos.candidatos,
          infoBrigadista: respuesta.data["data"],
        });
        /* mostrar secciones */
        setSecciones(respuesta.data["secuencias"]);
        setState({
          curp_reg: "",
          pass_reg: "",
          comp_pass_reg: "",
          curp_ing: "",
          pass: "",
        });
      }
    } catch (error) {
      AlertError("Error", error);
      if (typeof error.response !== "undefined") {
        if (error.response.status === 404) {
          AlertError("Error", error.response.data.msg);
        }
      }
    }
  };

  const changeSection = (to) => {
    setIngreso(to);
    if (to) {
      setState({
        ...state,
        curp_ing: "",
        pass: "",
      });
    } else {
      setState({
        ...state,
        curp_reg: "",
        pass_reg: "",
        comp_pass_reg: "",
      });
    }
  };

  const showAdvertencia = () => {
    AlertaSiguiente(
      "Una vez registrada esta contraseña, no podrá cambiarse por seguridad",
      () => setShowTerminosCondiciones(true)
    );
  };

  return (
    <div class="container login-container">
      <div class="row">
        {showTerminosCondiciones ? (
          <React.Fragment>
            <TerminosAviso
              aceptarTerminos={aceptarTerminos}
              setAceptarTerminos={setAceptarTerminos}
              sendTerminos={sendTerminos}
              setShowTerminosCondiciones={setShowTerminosCondiciones}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Registro
              state={state}
              setState={setState}
              onClick={() => changeSection(true)}
              enable={!ingreso}
              showTerminosCondiciones={showAdvertencia}
            />
            <Ingreso
              state={state}
              setState={setState}
              onClick={() => changeSection(false)}
              enable={ingreso}
              checkLogin={checkLogin}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Login;
