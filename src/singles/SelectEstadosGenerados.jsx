import React from "react";

const SelectEstadosGenerados = (props) => {
  const { name, className, onBlur, onChange, value, data } = props;

  return (
    <select
      className={className}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    >
      <option value="">--Seleccione--</option>
      {data.map((item) => (
        <option key={item.cve_ent} value={item.id}>
          {item.nom_ent}
        </option>
      ))}
    </select>
  );
};

export default SelectEstadosGenerados;
