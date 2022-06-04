import React, { useEffect, useState } from "react";
import { ObtenerAeropuertos } from "../services/catalogs/CatalogoService";

const SelectAeropuertos = (props) => {
  const { name, className, onChange, value, readOnly = false, disabled = false } = props;
  const [data, setData] = useState([]);


  useEffect(() => {

    ObtenerAeropuertos().then(async (response) => {
      if (response.status === 200) {
        setData(response.data);
      }
    });

    return () => { }

  }, [])

  return (
    <select
      name={name}
      className={className}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      disabled={disabled}
    >
      <option value="">---Seleccione---</option>
      {data && data.map((item, index) => (
        <option key={index} value={item.id}>
          {item.nombre} - {item.cod_iata}
        </option>
      ))}
    </select>
  );
};
export default SelectAeropuertos;
