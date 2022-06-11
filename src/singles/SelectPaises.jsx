import React, { useEffect, useState } from "react";
import { ObtenerPaises } from "../services/catalogs/CatalogoService";

const SelectPaises = (props) => {
  const { name, className, onBlur, onChange, defaultValue, value, disabled } =
    props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await ObtenerPaises().then(async (response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <select
      className={className}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <option value="">--Seleccione--</option>
      {data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.nombre} - {item.clave}
        </option>
      ))}
    </select>
  );
};

export default SelectPaises;
