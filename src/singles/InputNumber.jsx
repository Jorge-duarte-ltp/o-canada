import React from 'react'

const InputNumber = (props) => {

    const { className, name, value, onChange, placeholder, limitLength, onBlur, onChangeCapture, disabled, min, max } = props
    
    return (
        <input
            disabled={disabled}
            className={className}
            name={name}
            value={value}
            onInput={e => e.target.value = e.target.value.slice(0, limitLength)}
            type="number"
            min={min}
            max={max}
            onChange={onChange}
            onChangeCapture={onChangeCapture}
            onBlur={onBlur}
            placeholder={placeholder}
        />
    );
}

export default InputNumber;