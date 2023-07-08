import React, { useState, useContext } from "react";
import Registro from "../captura/Registro";
import Ingreso from "./Ingreso";
import TerminosAviso from "./TerminosAviso";
/* CONTEXT */
import candidatoContext from "../../context/candidato/candidatoContext";
import AlertError from "../../singles/AlertError";
import AlertaSiguiente from "../../singles/AlertaSiguiente";
import { getCandidate, postCandidateCreate } from "../../services/candidates/CandidateService";

const Login = (props) => {

  const { secciones, setSecciones } = props;
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

    const { curp_reg, comp_pass_reg } = state;


    await postCandidateCreate({
      curp: curp_reg,
      pass: comp_pass_reg,
      acuerdo_aviso: aceptarTerminos,
    }).then((resp) => {

      if (resp.status === 200) {
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
    }).catch((error) => {
      console.log(error);
      AlertError("Error", "Ya existe un usuario con esa curp, intente acceder con su contraseña.");
    });

  };

  const checkLogin = async () => {
    const { curp_ing, pass } = state;
    await getCandidate({ curp: curp_ing, pass: pass }).then(async (resp) => {

      if (resp.status === 200) {

        const { data: { data } } = resp;

        candidatos.candidatos.agregarCandidato({
          ...candidatos.candidatos,
          infoBrigadista: { ...data },
        });

        /* mostrar secciones */
        setSecciones(resp.data["secuencias"]);
        setState({
          curp_reg: "",
          pass_reg: "",
          comp_pass_reg: "",
          curp_ing: "",
          pass: "",
        });

      }
    }).catch((error) => {
      console.log(error);
      AlertError("Error", "Las credenciales  acceso son incorrectas o el usuario no existe");
    });

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
    <div className="container login-container">
      <div className="row">
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
            <footer>
              <div className="pl-5 m-5 mt-5 text-danger">
                <h3><strong className="text-dark ml-5">Nota:</strong> Se recomienda usar el Navegador Google Chrome</h3>
              </div>
            </footer>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Login;
