import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import AlertError from "./AlertError";
import { ObtenerMunicipios } from "../services/catalogs/CatalogoService";

const SelectMunicipio = (props) => {
  const { name, className, onChange, onBlur, onClick, value, cve_entidad, defaultValue } = props;
  const [data, setData] = useState([]);



  useEffect(() => {

    if (!isEmpty(cve_entidad)) {

      ObtenerMunicipios(cve_entidad).then((resp) => {
        if (resp.status === 200) {
          setData(resp.data);
        }
      }).catch((error) => {
        AlertError("Error", error);
      });

    }

    return () => { };

  }, [cve_entidad])

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
          {item.nom_mun}
        </option>
      ))}
    </select>
  );
};

export default SelectMunicipio;
