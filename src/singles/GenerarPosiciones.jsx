import React, { useEffect, useState } from "react";
import { size, range } from "lodash";

export const GenerarPosiciones = (props) => {
  const { state, setState, cantDespliegues, name } = props;
  const [despliegues, setDespliegues] = useState(
    state[name] ? state[name] : {}
  );

  const [num, setNum] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      for (let i in range(0, cantDespliegues)) {
        const index = parseInt(i) + 1;

        num.push({
          id: index,
          posicion: { name: `posicion${index}`, value: "" },
          anio: { name: `anio${index}`, value: "" },
        });

        setNum(num);

        setDespliegues({
          ...despliegues,
          [`posicion${index}`]: despliegues[`posicion${index}`],
          [`anio${index}`]: despliegues[`anio${index}`],
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, []);

  const setInfo = (input) => {
    setDespliegues({
      ...despliegues,
      [input.target.name]: input.target.value.toUpperCase(),
    });
    setState({ ...state, [name]: despliegues });
  };

  const setAnio = (input) => {
    if (size(input.target.value) < 5 && input.target.value >= 0) {
      setDespliegues({
        ...despliegues,
        [input.target.name]: input.target.value.toUpperCase(),
      });
    }
    setState({ ...state, [name]: despliegues });
  };

  return (
    size(num) > 0 && (
      <React.Fragment>
        {num.map((item) => (
          <div className="col-4" key={item.id}>
            <label className="control-label pt-2">
              {item.id}.- ¿Qué posición ocupó en el despliegue?
              <select
                className="form-control myInput"
                id={item.posicion.name}
                name={item.posicion.name}
                onChange={setInfo}
                onBlur={setInfo}
                value={
                  despliegues[item.posicion.name]
                    ? despliegues[item.posicion.name]
                    : item.posicion.value
                }
              >
                <option value="">--- Seleccione ---</option>
                <option value="COMBATIENTE">Combatiente</option>
                <option value="JEFE_DE_CUADRILLA">Jefe de Cuadrilla</option>
                <option value="JEFE_DE_BRIGADA">Jefe de Brigada</option>
                <option value="TECNICO_AREP">Técnico (AREP)</option>
                <option value="TECNICO_IARR">Técnico (IARR)</option>
                <option value="COORDINADIR_COVID">
                  Ténico (COORDINADOR COVID)
                </option>
              </select>
            </label>
            <label className="control-label pt-2">
              ¿Ingrese el año del despliegue?
              <input
                name={item.anio.name}
                className="form-control myInput"
                type="number"
                onChange={setAnio}
                onBlur={setAnio}
                value={
                  despliegues[item.anio.name]
                    ? despliegues[item.anio.name]
                    : item.anio.value
                }
              />
            </label>
          </div>
        ))}
      </React.Fragment>
    )
  );
};

export default GenerarPosiciones;
