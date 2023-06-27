import React, { useEffect, useState } from "react";
import { range, size } from "lodash";
import SelectPaisesGenerados from "./SelectPaisesGenerados";
import { ObtenerPaises } from "../services/catalogs/CatalogoService";

export const GenerarPaises = (props) => {
  const { state, setState, cantPaises, name } = props;
  const [data, setData] = useState([]);
  const [num, setNum] = useState([]);
  const [paises, setPaises] = useState(state[name] ? state[name] : {});

  useEffect(() => {
    const timeout = setTimeout(() => {
      ObtenerPaises().then(async (response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      });

      for (let i in range(0, cantPaises)) {
        const index = parseInt(i) + 1;

        num.push({
          id: index,
          pais: { name: `pais${index}`, value: "" },
          anio: { name: `anio${index}`, value: "" },
          posicion: { name: `posicion${index}`, value: "" },
        });

        setNum(num);

        setPaises({
          ...paises,
          [`pais${index}`]: paises[`pais${index}`],
          [`anio${index}`]: paises[`anio${index}`],
          [`posicion${index}`]: paises[`posicion${index}`],
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line
  }, []);

  const setInfo = (input) => {
    setPaises({
      ...paises,
      [input.target.name]: input.target.value.toUpperCase(),
    });
    setState({ ...state, [name]: paises });
  };

  const setAnio = (input) => {
    if (size(input.target.value) < 5 && input.target.value >= 0) {
      setPaises({
        ...paises,
        [input.target.name]: input.target.value.toUpperCase(),
      });
    }
    setState({ ...state, [name]: paises });
  };

  return num.map((item) => (
    <div className="col-4" key={item.id}>
      <label className="control-label pt-2">
        {item.id}.- ¿A qué pais (s) fue asignado como recurso (a)?
        <SelectPaisesGenerados
          data={data}
          name={item.pais.name}
          className="form-control myInput"
          onChange={setInfo}
          onBlur={setInfo}
          value={
            paises[item.pais.name] ? paises[item.pais.name] : item.pais.value
          }
        />
      </label>
      <label className="control-label pt-2">
       ¿En qué año fue asignado (a) al pais?
        <input
          name={item.anio.name}
          className="form-control myInput"
          type="number"
          onChange={setAnio}
          onBlur={setAnio}
          value={
            paises[item.anio.name] ? paises[item.anio.name] : item.anio.value
          }
        />
      </label>
      <label className="control-label pt-2">
        ¿Qué posición ocupó?
        <select
          className="form-control myInput"
          id={item.posicion.name}
          name={item.posicion.name}
          onChange={setInfo}
          onBlur={setInfo}
          value={
            paises[item.posicion.name]
              ? paises[item.posicion.name]
              : item.posicion.value
          }
        >
          <option value="">--- Seleccione ---</option>
          <option value="COMBATIENTE">Combatiente</option>
          <option value="JEFE_DE_CUADRILLA">Jefe de Cuadrilla</option>
          <option value="JEFE_DE_BRIGADA">Jefe de Brigada</option>
          <option value="LIDER_DE_EQUIPO_DE_INTERVENCION">Líder de Equipo de intervención</option>
          <option value="TECNICO_AREP">Técnico (AREP)</option>
          <option value="TECNICO_SAREP">Técnico (SAREP)</option>
          <option value="TECNICO_IARR">Técnico (IARR)</option>
        </select>
      </label>
    </div>
  ));
};

export default GenerarPaises;
