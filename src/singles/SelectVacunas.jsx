import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import axiosClient from "../config/axios";
import AlertError from "./AlertError";
import { ObtenerVacunas } from "../services/catalogs/CatalogoService";

const SelectVacuna = (props) => {
  const { name, className, onChange, onBlur, onClick, value, defaultValue } = props;
  const [data, setData] = useState([]);
  const [timeout, setTimeout] = useState(0);


  useEffect(() => {

    setTimeout(() => {
      ObtenerVacunas().then((resp) => {
        if (resp.status === 200) {
          setData(resp.data);
        }
      }).catch((error) => {
        AlertError("Error", error);
      });
    }, 2000);

    return () => { clearTimeout(timeout) };

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
        <option key={item.id} value={item.id}>
          {item.nombre}
        </option>
      ))}
    </select>
  );
};

export default SelectVacuna;
