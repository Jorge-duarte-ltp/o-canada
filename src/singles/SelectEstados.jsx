import React, { useState } from "react";
import { isEmpty } from "lodash";
import axiosClient from "../config/axios";

const SelectEstados = (props) => {
  const { name, className, onChange, onBlur, onClick, value, defaultValue } = props;
  const [data, setData] = useState([]);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEN_URL}list_estados`,
  };

  if (isEmpty(data)) {
    axiosClient(config).then(async (response) => {
      const data = await response.data.data;
      setData(data);
    });
  }
  
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
      {typeof data != "undefined" &&
        data.map((item) => (
          <option key={item.cve_ent} value={item.cve_ent}>
            {item.nom_ent}
          </option>
        ))}
    </select>
  );
};

export default SelectEstados;
