import React from 'react';
import './About.scss';
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";
import projectImage from '../../images/project.png';

const About = () => {
    return (
        <div className={'About'}>
            <div className="About__container">
                <div className="About__intro">
                    <h1 className="About__header">
                        Organize Your, <br /> Work and Life
                    </h1>
                    <h2 className="About__desc">
                        Become organized, focused, and calm with Todoist.<br />
                        the world's #1 task manager and todo list app.
                    </h2>
                    <NavLink to={'/register'}>
                        <Button
                            id={'About__button'}
                            variant="outlined"
                            size="medium"
                        >
                            Start for free
                        </Button>
                    </NavLink>
                </div>
                <div className="About__image"></div>
            </div>
            <div className="About__image">
                <img src={projectImage} alt="" className="About__img"/>
            </div>
        </div>
    );
};

export default About;