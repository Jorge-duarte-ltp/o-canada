import React from "react";

const SelectPosionAsignada = (props) => {
  const { name, className, onBlur, onChange, value, filter, data, disabled} =
    props;

  let dataTemp = data.filter((item) => item.idPais === filter);

  return (
    <select
      className={className}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      disabled={disabled}
    >
      <option value="">--Seleccione--</option>
      {typeof dataTemp != "undefined" &&
        dataTemp.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre} - {item.clave}
          </option>
        ))}
    </select>
  );
};

export default SelectPosionAsignada;
