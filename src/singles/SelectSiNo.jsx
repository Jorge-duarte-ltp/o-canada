import React from 'react'


const SelectSiNo = (props) => {
    const { name, onChange, value, className, onBlur, onChangeCapture, disabled } = props

    return (
        <select
            className={className}
            onChange={onChange}
            onChangeCapture={onChangeCapture}
            onBlur={onBlur}
            name={name}
            disabled={disabled}
            value={value}
        >
            <option value=''>---Seleccione---</option>
            <option value={1}>SI</option>
            <option value={0}>NO</option>
        </select>
    );
}

export default SelectSiNo;