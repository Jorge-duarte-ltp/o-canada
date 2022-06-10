import React, { useState } from "react";
import SelectPaises from "./SelectPaises";
import { isEmpty, size } from "lodash";

export const GenerarPaises = (props) => {
  const { state, setState, cantPaises } = props;
  const [paises, setPaises] = useState(
    state.paises_asig_recurso ? state.paises_asig_recurso : {}
  );
  const [num, setNum] = useState([]);

  const setInfo = (input) => {
    setPaises({
      ...paises,
      [input.target.name]: input.target.value.toUpperCase(),
    });
    setState({ ...state, paises_asig_recurso: paises });
  };

  const setAnio = (input) => {
    if (size(input.target.value) < 5 && input.target.value >= 0) {
      setPaises({
        ...paises,
        [input.target.name]: input.target.value.toUpperCase(),
      });
    }
    setState({ ...state, paises_asig_recurso: paises });
  };

  if (isEmpty(num)) {
    let data = [];
    let object = {};
    for (let i = 0; i < cantPaises; i++) {
      data.push({ id: i + 1, nombre: `pais${i + 1}`, anio: `anio${i + 1}` });
      object = {
        ...object,
        [`pais${i + 1}`]: paises[`pais${i + 1}`],
        [`anio${i + 1}`]: paises[`anio${i + 1}`],
      };
    }
    setNum(data);
    if (size(paises) > cantPaises) {
      setPaises(object);
    }
  }

  console.log(num);
  console.log(paises);

  return (
    size(num) > 0 && (
      <React.Fragment>
        {num.map((item) => (
          <div className="col-4" key={item.id}>
            <label className="control-label pt-2">
              {item.id}.- ¿A qué pais (s) fue asignado como recurso (a)?
              <SelectPaises
                name={item.nombre}
                className="form-control myInput"
                onChange={setInfo}
                onBlur={setInfo}
                value={!isEmpty(paises[item.nombre]) ? paises[item.nombre] : ""}
              />
            </label>
            <label className="control-label pt-2">
              ¿En qué año fue asignado (a) al pais?
              <input
                name={item.anio}
                className="form-control myInput"
                type="number"
                onChange={setAnio}
                onBlur={setAnio}
                value={!isEmpty(paises[item.anio]) ? paises[item.anio] : ""}
              />
            </label>
          </div>
        ))}
      </React.Fragment>
    )
  );
};

export default GenerarPaises;
