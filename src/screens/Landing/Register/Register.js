import React, {useEffect, useRef, useState} from 'react';
import './Register.css';
import {Link, Navigate, useNavigate} from "react-router-dom";
import inputChangeHandlerHelper from '../../../utls/input.change.handler';
import {register} from '../../../store/actions/auth.actions';
import {connect} from "react-redux";

const Register = (props) => {
    const [form, setForm] = useState({
        username: {
            elementType: 'input',
            value: '',
            validation: {
                required: true,
                minLength: 10
            },
            valid: false,
            touched: false
        },
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
            username: form.username.value,
            email: form.email.value,
            password: form.password.value
        }

        props.register(userData, navigate);

    }

    useEffect(() => {
        const elements = document.querySelectorAll('.Register *');
        setTimeout(() => {
            elements.forEach(el => {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            })
        }, 200);
    }, []);

    return (
        <div className={'Register'}>
            {props.isAuthenticated && <Navigate to={'/'} />}
            <div className={'Register__container'}>
                <div className={'Register__header'}>
                    <h1 className="Register__header-greeting">Create your account</h1>
                </div>
                <div className={'Register__form'}>
                    <form onSubmit={e => userSubmitHandler(e)} onChange={e => inputChangeHandler(e)} className={'Register__form-form'}>
                        <div className="Register__form-item">
                            <label htmlFor="" className="Register__form-label">Your Name</label>
                            <div className="Register__form-input">
                                <input className={`input ${!form.username.valid && form.username.touched && 'input__invalid'}`} data-key={'username'} type="text" placeholder={'Enter Your Name'}/>
                                <i className="fa-solid fa-user"></i>
                            </div>
                        </div>
                        <div className="Register__form-item">
                            <label htmlFor="" className="Register__form-label">Your email</label>
                            <div className="Register__form-input">
                                <input className={`input ${!form.email.valid && form.email.touched && 'input__invalid'}`} value={form.email.value} data-key={'email'} type="text" placeholder={'Enter Your Email'}/>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            {props.error.type === 'email' ? <p className={'Register__form-error'}>{props.error.msg}</p> : null}
                        </div>
                        <div className="Register__form-item">
                            <label htmlFor="" className="Register__form-label">Your password</label>
                            <div className="Register__form-input">
                                <input className={`input ${!form.password.valid && form.password.touched && 'input__invalid'}`} value={form.password.value} type="password" data-key={'password'} placeholder={'Enter Your Password'}/>
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            {props.error.type === 'password' ? <p className={'Register__form-error'}>${props.error.msg}</p> : null}
                        </div>
                        <div className={'Register__form-item'}>
                            <button disabled={!formIsValid} className={'Register__form-button'}>SIGN IN</button>
                        </div>
                    </form>
                    <div className={'Register__form-login'}>
                        <p>Already a member? <Link to={'/login'}>LOGIN</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state =>{
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {register}) (Register);