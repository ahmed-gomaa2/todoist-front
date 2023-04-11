import React from 'react';
import './Landing.css';
import About from "../../components/About/About";
import Features from "../../components/Features/Features";

const Landing = props => {
    return (
        <div className={'Landing'}>
            <About />
            <Features />
        </div>
    );
};

export default Landing;