import React from "react";

const SelectPaisesGenerados = (props) => {
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
        <option key={item.id} value={item.id}>
          {item.nombre}
        </option>
      ))}
    </select>
  );
};

export default SelectPaisesGenerados;
