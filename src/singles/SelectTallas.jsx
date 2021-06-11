import React from "react";

export const SelectTallas = (props) => {
  const { name, onChange, className, defaultValue } = props;
  return (
    <select
      className={className}
      onChange={onChange}
      name={name}
      value={defaultValue}
    >
      <option value="">---Seleccione---</option>
      <option value={1}>CH</option>
      <option value={2}>M</option>
      <option value={3}>G</option>
      <option value={4}>XG</option>
    </select>
  );
};

export const SelectTallasGorras = (props) => {
  const { name, onChange, defaultValue, className, onBlur } = props;

  return (
    <select
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      value={defaultValue}
    >
      <option value="">---Seleccione---</option>
      <option value={10}>CH - M</option>
      <option value={11}>G - XG</option>
    </select>
  );
};

export const SelectTallasPantalon = (props) => {
  const { name, onChange, defaultValue, className } = props;

  return (
    <select
      className={className}
      onChange={onChange}
      name={name}
      value={defaultValue}
    >
      <option value="">---Seleccione---</option>
      <option value={5}>28</option>
      <option value={6}>30</option>
      <option value={7}>32</option>
      <option value={8}>34</option>
      <option value={9}>36</option>
      <option value={60}>38</option>
    </select>
  );
};

export const SelectTallasBotas = (props) => {
  const { name, onChange, defaultValue, className, onBlur } = props;

  return (
    <select
      className={className}
      onChange={onChange}
      name={name}
      value={defaultValue}
      onBlur={onBlur}
    >
      <option value="">---Seleccione---</option>
      <option value={12}> 22 MX - 4 USA</option>
      <option value={13}> 22.5 MX - 4.5 USA</option>
      <option value={14}> 23 MX - 5 USA</option>
      <option value={15}> 23.5 MX - 5.5 USA</option>
      <option value={16}> 24 MX - 6 USA </option>
      <option value={17}> 24.5 MX - 6.5 USA </option>
      <option value={18}> 25 MX 27 - USA </option>
      <option value={19}> 25.5 MX - 7.5 USA </option>
      <option value={20}> 26 MX - 8 USA</option>
      <option value={21}> 26.5 MX - 8.5 USA</option>
      <option value={22}> 27 MX - 9 USA </option>
      <option value={23}> 27.5 MX - 9.5 USA </option>
      <option value={24}> 28 MX - 10 USA</option>
      <option value={25}> 28.5 MX - 10.5 USA</option>
      <option value={26}> 29 MX - 11 USA </option>
      <option value={27}> 29.5 MX - 11.5 USA</option>
      <option value={28}> 30 MX - 12 USA </option>
      <option value={30}> 31 MX - 13 USA </option>
    </select>
  );
};
