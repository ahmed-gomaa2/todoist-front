import React from 'react';

const Header = props => {

    return (
        <div className="Body__header">
            <p className="Body__title">
                {props.header}
            </p>
        </div>
    );
};

export default Header;