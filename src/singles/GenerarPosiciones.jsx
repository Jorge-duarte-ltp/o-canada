import React, { useEffect, useState } from "react";
import SelectPaises from "./SelectPaises";
import { isEmpty, size, range } from "lodash";

export const GenerarPosiciones = (props) => {
  const { state, setState, cantDespliegues } = props;
  const [despliegues, setDespliegues] = useState(
    state.despliegues_internacionales ? state.despliegues_internacionales : {}
  );
  const [num, setNum] = useState([]);

  useEffect(() => {
    const data = [];
    let object = {};

    for (let i in range(0, cantDespliegues)) {

      const index = parseInt(i) + 1;
      
      data.push({ id: index, nombre: `posicion${index}`, anio: `anio${index}` });

      object = {
        ...object,
        [`posicion${index}`]: despliegues[`posicion${index}`],
        [`anio${index}`]: despliegues[`anio${index}`],
      };
    }

    setNum(data);
    if (size(despliegues) > cantDespliegues) {
      setDespliegues(object);
    }

  }, [])

  const setInfo = (input) => {
    setDespliegues({
      ...despliegues,
      [input.target.name]: input.target.value.toUpperCase(),
    });
    setState({ ...state, despliegues_internacionales: despliegues });
  };

  const setAnio = (input) => {
    if (size(input.target.value) < 5 && input.target.value >= 0) {
      setDespliegues({
        ...despliegues,
        [input.target.name]: input.target.value.toUpperCase(),
      });
    }
    setState({ ...state, despliegues_internacionales: despliegues });
  };



  return (
    size(num) > 0 && (
      <React.Fragment>
        {num.map((item) => (
          <div className="col-4" key={item.id}>
            <label className="control-label pt-2">
              {item.id}.- ¿Qué posición ocupó en el despliegue?
              <select className="form-control myInput"
                id={item.nombre}
                name={item.nombre}
                onChange={setInfo}
                onBlur={setInfo}
                value={!isEmpty(despliegues[item.nombre]) ? despliegues[item.nombre] : ""}
              >
                <option >--- Seleccione ---</option>
                <option value='COMBATIENTE'>Combatiente</option>
                <option value='JEFE_DE_CUADRILLA'>Jefe de Cuadrilla</option>
                <option value='JEFE_DE_BRIGADA'>Jefe de Brigada</option>
                <option value='TECNICO_AREP'>Técnico (AREP)</option>
                <option value='TECNICO_IARR'>Técnico (IARR)</option>
                <option value='COORDINADIR_COVID'>Ténico (COORDINADOR COVID)</option>
              </select>
            </label>
            <label className="control-label pt-2">
              ¿Ingrese el año del despliegue?
              <input
                name={item.anio}
                className="form-control myInput"
                type="number"
                onChange={setAnio}
                onBlur={setAnio}
                value={!isEmpty(despliegues[item.anio]) ? despliegues[item.anio] : ""}
              />
            </label>

          </div>
        ))}
      </React.Fragment>
    )
  );
};

export default GenerarPosiciones;
