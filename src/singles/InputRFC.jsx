import React, { useState } from 'react'

const InputRFC = (props) => {

    const {
        onKeyPressCapture,
        name,
        defaultValue,
        placeholder,
        className,
        onChange,
    } = props

    // const [valido, setValido] = useState('')
    const [claseValido,] = useState('')





    // const checkStructure = () => {
    //     if (typeof rfc != 'undefined') {
    //         if (rfc.length > 1) {
    //             const check = (rfcValido(rfc) === rfc) ? true : false;
    //             setClaseValido((check) ? '' : 'noValido')
    //             setCorrect(check)
    //             setValido(check);
    //         } else {
    //             setClaseValido('')
    //             setValido('');
    //         }
    //     }
    // }


    return (
        <React.Fragment>
            <input
                className={`${className} ${claseValido}`}
                value={defaultValue ? defaultValue : ''}
                placeholder={placeholder}
                onKeyPressCapture={onKeyPressCapture}
                onChange={onChange}
                // onChangeCapture={checkStructure}
                // onBlur={checkStructure}
                name={name}
            />
            {/* {valido === false &&
                <div className="col-sm-4">
                    <small className="text-danger">
                        El RFC no es valido.
                </small>
                </div>
            } */}
        </React.Fragment>
    );
}

export default InputRFC;