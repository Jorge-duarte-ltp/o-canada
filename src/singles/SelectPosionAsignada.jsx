import React, { useEffect, useState } from "react";

const SelectPosionAsignada = (props) => {
  const [temp, setTemp] = useState([]);
  const { name, className, onBlur, onChange, value, filter, data, disabled } =
    props;

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setTemp(data.filter((item) => item.idPais === filter));
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, [filter]);

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
      {temp.map((item) => (
        <option key={item.id} value={item.id}>
          {item.nombre} - {item.clave}
        </option>
      ))}
    </select>
  );
};

export default SelectPosionAsignada;
