import React from "react";

const SelectIndicativo = ({
  onChange,
  value,
  name,
  indicativo,
  className,
  disabled,
}) => {
  const data = [];

  let i = 0;
  for (let letra = "a"; letra <= indicativo; letra = String.fromCharCode(letra.charCodeAt(0) + 1)) {
    data.push({id: i, value: letra});
    i++;
  }

  return (
    <select
      className={className}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">-- Seleccione --</option>
      {data.map(item => (
        <option key={item.id} value={item.value}>
          {item.value}
        </option>
      ))}
    </select>
  );
};

export default SelectIndicativo;
