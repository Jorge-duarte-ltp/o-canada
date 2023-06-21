import React, { useEffect, useState } from "react";
import { range, size } from "lodash";
import SelectEstadosGenerados from "./SelectEstadosGenerados";
import { ObtenerEstados } from "../services/catalogs/CatalogoService";

export const GenerarEstados = (props) => {
  const { state, setState, cantEstados, name } = props;
  const [data, setData] = useState([]);
  const [num, setNum] = useState([]);
  const [estados, setEstados] = useState(state[name] ? state[name] : {});
  const posiciones = [
    {
      id: 1,
      name: "combatiente",
      items: [
        { id: 1, name: "Combatiente", value: "COMBATIENTE" },
        { id: 2, name: "Jefe de Cuadrilla", value: "JEFE_DE_CUADRILLA" },
        { id: 3, name: "Jefe de Brigada", value: "JEFE_DE_BRIGADA" },
      ],
    },
    {
      id: 2,
      name: "tecnico",
      items: [
        {
          id: 1,
          name: "Comandante del Incidente",
          value: "COMANDANTE_DEL_INCIDENTE",
        },
        {
          id: 2,
          name: "Oficial de Información Pública",
          value: "OFICIAL_DE_INFORMACIÓN_PÚBLICA",
        },
        { id: 3, name: "Oficial de Enlace", value: "OFICIAL_DE_ENLACE" },
        { id: 4, name: "Oficial de Seguridad", value: "OFICIAL_DE_SEGURIDAD" },
        {
          id: 5,
          name: "Jefe de Sección de Operaciones",
          value: "JEFE_DE_SECCIÓN_DE_OPERACIONES",
        },
        {
          id: 6,
          name: "Coordinador de Rama de Operaciones Aéreas",
          value: "COORDINADOR_DE_RAMA_DE_OPERACIONES_AÉREAS",
        },
        { id: 7, name: "Coordinador Aéreo", value: "COORDINADOR_AÉREO" },
        {
          id: 8,
          name: "Supervisor de División",
          value: "SUPERVISOR_DE_DIVISIÓN",
        },
        {
          id: 9,
          name: "Líder de Fuerza de Tarea",
          value: "LÍDER_DE_FUERZA_DE_TAREA",
        },
        {
          id: 10,
          name: "Jefe de Sección de Planificación",
          value: "JEFE_DE_SECCIÓN_DE_PLANIFICACIÓN",
        },
        {
          id: 11,
          name: "Técnico especialista en SIG",
          value: "TÉCNICO_ESPECIALISTA_EN_SIG",
        },
        {
          id: 12,
          name: "Líder de la Unidad de Recursos",
          value: "LÍDER_DE_LA_UNIDAD_DE_RECURSOS",
        },
        {
          id: 13,
          name: "Jefe de Sección de Logística",
          value: "JEFE_DE_SECCIÓN_DE_LOGÍSTICA",
        },
        {
          id: 14,
          name: "Coordinador de la Rama de Apoyo",
          value: "COORDINADOR_DE_LA_RAMA_DE_APOYO",
        },
        {
          id: 15,
          name: "Coordinador de la Rama de Servicios",
          value: "COORDINADOR_DE_LA_RAMA_DE_SERVICIOS",
        },
        {
          id: 16,
          name: "Jefe de Sección de Administración y Finanzas",
          value: "JEFE_DE_SECCIÓN_DE_ADMINISTRACIÓN_Y_FINANZAS",
        },
        {
          id: 17,
          name: "Líder de la Unidad de Adquisiciones",
          value: "LÍDER_DE_LA_UNIDAD_DE_ADQUISICIONES",
        },
        {
          id: 18,
          name: "Líder de la Unidad de Costos",
          value: "LÍDER_DE_LA_UNIDAD_DE_COSTOS",
        },
      ],
    },
  ];

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
          estado: { name: `estado${index}`, value: "" },
          anio: { name: `anio${index}`, value: "" },
          posicion: { name: `posicion${index}`, value: "" },
          nombre: { name: `nombre${index}`, value: "" },
        });

        setNum(num);

        setEstados({
          ...estados,
          [`estado${index}`]: estados[`estado${index}`],
          [`anio${index}`]: estados[`anio${index}`],
          [`posicion${index}`]: estados[`posicion${index}`],
          [`nombre${index}`]: estados[`nombre${index}`],
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

  const setAnio = (input) => {
    if (size(input.target.value) < 5 && input.target.value >= 0) {
      setEstados({
        ...estados,
        [input.target.name]: input.target.value.toUpperCase(),
      });
    }
    setState({ ...state, [name]: estados });
  };

  const getNamesByPosition = (value) => {
    return posiciones.find((item) => item.name.toUpperCase() === value);
  };

  return num.map((item) => (
    <div className="col-4" key={item.id}>
      <label className="control-label pt-2">
        {item.id}.- ¿A qué estado (s) fue asignado como recurso (a)?
        <SelectEstadosGenerados
          data={data}
          name={item.estado.name}
          className="form-control myInput"
          onChange={setInfo}
          onBlur={setInfo}
          value={
            estados[item.estado.name]
              ? estados[item.estado.name]
              : item.estado.value
          }
        />
      </label>
      <label className="control-label pt-2">
        ¿En qué año fue asignado (a) al estado?
        <input
          name={item.anio.name}
          className="form-control myInput"
          type="number"
          onChange={setAnio}
          onBlur={setAnio}
          value={
            estados[item.anio.name] ? estados[item.anio.name] : item.anio.value
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
            estados[item.posicion.name]
              ? estados[item.posicion.name]
              : item.posicion.value
          }
        >
          <option value="">--- Seleccione ---</option>
          <option value="COMBATIENTE">Combatiente</option>
          <option value="TECNICO">Técnico</option>
        </select>
      </label>
      <label className="control-label pt-2">
        ¿Cuál es el nombre de la posición que ocupo?
        <select
          className="form-control myInput"
          id={item.nombre.name}
          name={item.nombre.name}
          onChange={setInfo}
          onBlur={setInfo}
          value={
            estados[item.nombre.name]
              ? estados[item.nombre.name]
              : item.nombre.value
          }
        >
          <option value="">--- Seleccione ---</option>
          {getNamesByPosition(estados[item.posicion.name])?.items?.map((field) => (
            <option key={field.id} value={field.value}>
              {field.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  ));
};

export default GenerarEstados;
