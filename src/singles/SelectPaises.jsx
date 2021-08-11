import React, { useState } from "react";
import { isEmpty } from "lodash";
import axiosClient from "../config/axios";

const SelectPaises = (props) => {
  const { name, className, onBlur, onChange, defaultValue, value, disabled } = props;
  const [data, setData] = useState([]);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEN_URL}list_paises`,
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
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <option value="">--Seleccione--</option>
      {typeof data != "undefined" &&
        data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre} - {item.clave}
          </option>
        ))}
    </select>
  );
};

export default SelectPaises;
