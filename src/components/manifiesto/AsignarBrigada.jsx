import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FormAsignarBrigada from "./FormAsignarBrigada";
import InfoAsignarBrigada from "./InfoAsignarBrigada";
import InfomacionCandidato from "./InformaciónCandidato";

const AsignarBrigada = ({ data, setShow, setReload }) => {
  const {
    id,
    fotografia,
    curp_brigadista,
    nombres,
    nom_ent,
    posicion_candidato,
    asignado,
  } = data;
  const [asignacion, setAsignacion] = useState({ idCandidato: id, asignado });

  return (
    <>
      <div style={{ alignContent: "right" }}>
        <h3>Manifiesto</h3>
      </div>
      <Button className="btn btn-danger" onClick={() => setShow(false)}>
        Regresar
      </Button>
      <InfomacionCandidato
        nom_ent={nom_ent}
        curp={curp_brigadista}
        nombres={nombres}
        fotografia={fotografia}
        posicion_candidato={posicion_candidato}
      />
      {asignado === "1" || asignado === "0"? (
        <InfoAsignarBrigada state={asignacion} setState={setAsignacion} />
      ) : (
        <FormAsignarBrigada
          setShow={setShow}
          state={asignacion}
          setReload={setReload}
          setState={setAsignacion}
        />
      )}
    </>
  );
};

export default AsignarBrigada;
