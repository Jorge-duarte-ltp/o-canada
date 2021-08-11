import React from "react";
const SelectProvicia = (props) => {
  const {
    name,
    className,
    onBlur,
    onChange,
    defaultValue,
    value,
    filter,
    data,
    disabled,
  } = props;

  let dataTemp = data.filter((item) => item.idPais === filter);

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
      {typeof dataTemp != "undefined" &&
        dataTemp.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre} - {item.clave}
          </option>
        ))}
    </select>
  );
};

export default SelectProvicia;
