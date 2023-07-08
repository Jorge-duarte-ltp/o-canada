import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import AlertError from "./AlertError";
import { ObtenerAniosByPaisId } from "../services/catalogs/CatalogoService";

const SelectAnios = (props) => {
  const { name, className, onChange, onBlur, onClick, value, idPais, defaultValue } = props;
  const [data, setData] = useState([]);



  useEffect(() => {

    if (!isEmpty(idPais)) {

      ObtenerAniosByPaisId(idPais).then((resp) => {
        if (resp.status === 200) {
          setData(resp.data);
        }
      }).catch((error) => {
        AlertError("Error", error);
      });

    }

    return () => { };

  }, [idPais])

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
      <option value="">--Seleccione--</option>
      {data && data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.anio}
        </option>
      ))}
    </select>
  );
};

export default SelectAnios;
