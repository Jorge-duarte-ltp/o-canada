import React, { useEffect, useState } from "react";
import SelectEstadosGenerados from "./SelectEstadosGenerados";
import { isEmpty, size } from "lodash";
import { ObtenerEstados } from "../services/catalogs/CatalogoService";

export const GenerarEstados = (props) => {
  const { state, setState, cantEstados, titulo, name } = props;
  const [estados, setEstados] = useState(state[name] ? state[name] : {});
  const [num, setNum] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
    ObtenerEstados().then(async (response) => {
      const data = await response.data;
      setData(data);
    });
  }, []);

  const setInfo = (input) => {

    setEstados({
      ...estados,
      [input.target.name]: input.target.value.toUpperCase(),
    });
    
    setState({ ...state, [name]: estados });
  };

  if (isEmpty(num)) {
    let data = [];
    let object = {};
    for (let i = 0; i < cantEstados; i++) {
      data.push({ id: i + 1, nombre: `estado${i + 1}` });
      object = { ...object, [`estado${i + 1}`]: estados[`estado${i + 1}`] };
    }
    setNum(data);
    if (size(estados) > cantEstados) {
      setEstados(object);
    }
  }

  return (
    size(num) > 0 && (
      <React.Fragment>
        {num.map((item) => (
          <div className="col-4" key={item.id}>
            <label className="control-label pt-2">
              {item.id}.- {titulo}
              <SelectEstadosGenerados
                data={data}
                name={item.nombre}
                className="form-control myInput"
                onChange={setInfo}
                onBlur={setInfo}
                value={
                  !isEmpty(estados[item.nombre]) ? estados[item.nombre] : ""
                }
              />
            </label>
          </div>
        ))}
      </React.Fragment>
    )
  );
};

export default GenerarEstados;
