import React, {useState} from 'react';
import './Navigation.css';
import {Link, NavLink} from "react-router-dom";

const Navigation = props => {
    const [show, setShow] = useState(false);

    const clickNavLinkHandler = e => {
        const link = e.target.closest('.Navigation__link-a');
        if(!link) return;
        setShow(false);
    }

    return (
        <div className={'Navigation'}>
            <div className="Navigation__container">
                <div className="Navigation__logo-container">
                    <div className="Navigation__logo-logo">
                        <Link to={'/landing'}>T</Link>
                    </div>
                </div>
                <div className={`Navigation__overlay ${show ? 'Navigation__show' : null}`} onClick={e => setShow(false)}></div>
                <div onClick={e => setShow(true)} className={`Navigation__burger`}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`Navigation__links ${show && 'Navigation__show Navigation__sidebar'}`}>
                    <div className="Navigation__sidebar-header">
                        <div className="Navigation__sidebar-logo">
                            <div className="Navigation__logo-logo">
                                <Link to={'/landing'}>T</Link>
                            </div>
                        </div>
                        <div className="Navigation__sidebar-close" onClick={e => setShow(false)}>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <ul onClick={e => clickNavLinkHandler(e)} className={`Navigation__links-ul`}>
                        <li className="Navigation__link"><NavLink activeClassName={'active'} to={'/about'} className={'Navigation__link-a'}><p>About</p></NavLink></li>
                        <li className="Navigation__link"><NavLink activeClassName={'active'} to={'/features'} className={'Navigation__link-a'}><p>Features</p></NavLink></li>
                        <li className="Navigation__link"><NavLink activeClassName={'active'} to={'/login'} className={'Navigation__link-a'}><p>Login</p></NavLink></li>
                        <li className="Navigation__link"><NavLink activeClassName={'active'} to={'/register'} className={'Navigation__link-a'}><p>Start for free</p></NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navigation;