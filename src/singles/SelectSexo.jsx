import React from 'react'

const SelectSexo = (props) => {

    const { className, name, onChange, value, disabled } = props
    return (
        <select
            value={value}
            className={className}
            disabled={disabled}
            defaultValue={value}
            name={name}
            onChange={onChange}
        >
            <option value=''>--Seleccione--</option>
            <option value={2}>Femenino</option>
            <option value={1}>Masculino</option>
        </select>
    );
}

export default SelectSexo;