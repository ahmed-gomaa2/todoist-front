import React, {useEffect, useState} from 'react';
import './Login.css';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import inputChangeHandlerHelper from "../../../utls/input.change.handler";
import {login} from "../../../store/actions/auth.actions";

const Login = (props) => {
    const [form, setForm] = useState({
        email: {
            validation: {
                required: true,
                isEmail: true
            },
            value: '',
            valid: false,
            touched: false
        },
        password: {
            validation: {
                required: true,
                minLength: 7
            },
            value: '',
            valid: false,
            touched: false
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const navigate = useNavigate();

    const inputChangeHandler = e => {
        const {formIsValid, updatedFormData} = inputChangeHandlerHelper(e, form, 'input');
        setForm(updatedFormData);
        setFormIsValid(formIsValid);
    }

    // const inputFocusedHandler = e => {
    //     const focusedInputElementKey = e.target.dataset.key;
    //     console.log(focusedInputElementKey);
    //     form[focusedInputElementKey].touched = true;
    // }

    const userSubmitHandler = e => {
        e.preventDefault();
        const userData = {
            email: form.email.value,
            password: form.password.value
        }

        props.login(userData, navigate);

    }

    useEffect(() => {
        const elements = document.querySelectorAll('.Login *');
        setTimeout(() => {
            elements.forEach(el => {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            })
        }, 200);
    }, []);
    return (
        <div className={'Login'}>
            {props.isAuthenticated && <Navigate to={'/'} />}
            <div className={'Login__container'}>
                <div className={'Login__header'}>
                    <h1 className="Login__header-greeting">Welcome back again</h1>
                </div>
                <div className={'Login__form'}>
                    <form onSubmit={e => userSubmitHandler(e)} onChange={e => inputChangeHandler(e)} className={'Login__form-form'}>
                        <div className="Login__form-item">
                            <label htmlFor="" className="Login__form-label">Your email</label>
                            <div className="Login__form-input">
                                <input data-key={'email'} className={`input ${!form.email.valid && form.email.touched && 'input__invalid'}`} type="text" placeholder={'Enter Your Email'}/>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            {props.error.type === 'email' ? <p className={'Register__form-error'}>{props.error.msg}</p> : null}
                        </div>
                        <div className="Login__form-item">
                            <label htmlFor="" className="Login__form-label">Your password</label>
                            <div className="Login__form-input">
                                <input data-key={'password'} className={`input ${!form.password.valid && form.password.touched && 'input__invalid'}`} type="password" placeholder={'Enter Your Password'}/>
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            {props.error.type === 'password' ? <p className={'Register__form-error'}>{props.error.msg}</p> : null}
                        </div>
                        <div className={'Login__form-item'}>
                            <button disabled={!formIsValid} className={'Login__form-button'}>SIGN IN</button>
                        </div>
                    </form>
                    <div className={'login__form-register'}>
                        <p>Not a member? <Link to={'/register'}>REGISTER</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {login}) (Login);