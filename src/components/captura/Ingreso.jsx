import React, { useState } from 'react'
import InputCURP from '../../singles/InputCURP';
import ToMayus from '../../helpers/ToMayus';

const Ingreso = (props) => {
    const { enable, onClick, state, setState, checkLogin } = props

    const [curpValida, setCurpValida] = useState(false)

    const setInfo = (input) => {
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    return (
        <div className={`col-md-6 ${(enable) ? 'login-form-1' : 'login-form-2'}`}
            onClick={onClick}
        >
            <h3>Usuarios ya registrados</h3>
            <form>
                <div className="form-group">
                    <InputCURP
                        disabled={enable}
                        className={`form-control`}
                        name='curp_ing'
                        defaultValue={state.curp_ing}
                        onChange={setInfo}
                        curp={state.curp_ing}
                        onKeyPressCapture={ToMayus}
                        onBlur={curpValida}
                        placeholder='Ingrese CURP *'
                        setCorrect={setCurpValida}
                    />
                </div>
                <div className="form-group">
                    <input
                        name='pass'
                        disabled={enable}
                        onChange={setInfo}
                        type="password"
                        className="form-control"
                        placeholder="Contraseña *"
                        value={state.pass}
                    />
                </div>
                {(state.curp_ing && curpValida && state.pass) && <div className="form-group">
                    <input
                        disabled={enable}
                        type='button'
                        onClick={checkLogin}
                        className="btnSubmit"
                        value='Ingresar'
                    />
                </div>
                }
                <div className="form-group">
                    {/* <a href="#" className="ForgetPwd" value="Login">Recuperar Contraseña</a> */}
                </div>
            </form>
        </div>

    );
}

export default Ingreso;
