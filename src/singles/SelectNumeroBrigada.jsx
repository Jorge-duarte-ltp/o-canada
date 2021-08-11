import React from "react";

const SelectNumeroBrigada = ({
  onChange,
  value,
  name,
  numero,
  className,
  disabled,
}) => {
  const data = [];

  for (let i = 1; i <= numero; i++) {
    data.push({ [`id${i}`]: i });
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
      {data.map((item, key) => (
        <option key={item[`id${key + 1}`]} value={item[`id${key + 1}`]}>
          {item[`id${key + 1}`]}
        </option>
      ))}
    </select>
  );
};

export default SelectNumeroBrigada;
