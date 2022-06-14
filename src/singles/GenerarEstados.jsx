import React, { useEffect, useState } from "react";
import SelectEstadosGenerados from "./SelectEstadosGenerados";
import { range } from "lodash";
import { ObtenerEstados } from "../services/catalogs/CatalogoService";

export const GenerarEstados = (props) => {
  const { state, setState, cantEstados, titulo, name } = props;
  const [estados, setEstados] = useState(state[name] ? state[name] : {});
  const [num, setNum] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ObtenerEstados().then(async (response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      });

      for (let i in range(0, cantEstados)) {
        const index = parseInt(i) + 1;

        num.push({
          id: index,
          name: `estado${index}`,
          value: "",
        });

        setNum(num);

        setEstados({
          ...estados,
          [`estado${index}`]: estados[`estado${index}`],
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line
  }, []);

  const setInfo = (input) => {
    setEstados({
      ...estados,
      [input.target.name]: input.target.value.toUpperCase(),
    });

    setState({ ...state, [name]: estados });
  };

  return num.map((item) => (
    <div className="col-4 col-mb-4" key={item.id}>
      <label className="control-label pt-2">
        {item.id}.- {titulo}
        <SelectEstadosGenerados
          data={data}
          name={item.name}
          className="form-control myInput"
          onChange={setInfo}
          onBlur={setInfo}
          value={estados[item.name] ? estados[item.name] : item.value}
        />
      </label>
    </div>
  ));
};

export default GenerarEstados;
