import React, { useState, useContext, useEffect } from "react";
import Dashboard from "../components/administracion/Dashboard";
import LoginUsers from "../singles/LoginUsers";
import sessionContext from "../context/session/sessionContext";
import AlertError from "../singles/AlertError";
import { postLogin } from "../services/users/UsersService";

const Administracion = () => {
  const sessContext = useContext(sessionContext);
  const [user, setUser] = useState(false);

  // nota poner todo esto en false
  const [userPorfile, setUserPorfile] = useState({
    regionales: false,
    estatales: false,
    mesa_ayuda: false,
    brigadas: false,
    manifiesto: false,
  });

  const [toSend, setToSend] = useState({
    email: "",
    pass: "",
  });

  const checkUser = async (event) => {
    event.preventDefault();

    await postLogin(toSend).then((resp) => {
      if (resp.status === 200) {
        setUser(resp.data);
        sessContext.login.loginUser({
          ...sessContext.login,
          user: resp.data.user,
        });
        setUserPorfile(resp.data.user.porfile);
        sessionStorage.setItem("user_session", JSON.stringify(resp.data.user));
      }
    }).catch((error) => {
      AlertError("Error", error.responseJSON);

    });

  };

  useEffect(() => {
    // revisar el sessionStorage y asignar session
    const user = JSON.parse(sessionStorage.getItem("user_session"));

    if (user) {
      // asignar perfil y datos de usuario
      setUser(user);
      sessContext.login.loginUser({
        ...sessContext.login,
        user: user,
      });
      setUserPorfile(user.porfile);
    }
    return () => { }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //  descomentar esta parte
  return (
    <React.Fragment>
      {user ? (
        <Dashboard userPorfile={userPorfile} />
      ) : (
        <LoginUsers state={toSend} setState={setToSend} onSubmit={checkUser} />
      )}
    </React.Fragment>
  );
};

export default Administracion;
