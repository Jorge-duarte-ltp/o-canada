import React, { useEffect, useState } from "react";
import { ObtenerEstados } from "../services/catalogs/CatalogoService";

const SelectEstados = (props) => {
  const { name, className, onChange, onBlur, onClick, value, defaultValue } = props;
  const [data, setData] = useState([]);


  useEffect(() => {

    ObtenerEstados().then(async (response) => {
      if (response.status === 200) {
        setData(response.data);
      }
    });
    return () => {
    }
  }, [])

  return (
    <select
      className={className}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
      value={value ? value : ""}
      defaultValue={defaultValue}
    >
      <option value="">---Seleccione---</option>
      {data && data.map((item) => (
        <option key={item.cve_ent} value={item.cve_ent}>
          {item.nom_ent}
        </option>
      ))}
    </select>
  );
};

export default SelectEstados;
