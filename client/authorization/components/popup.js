import React from 'react'
import classNames from './scss/popup.module.scss';

const Popup = (props) => {
    if (!props.open)
        return (null);

    return (
        <div className={classNames.popup}>
            {props.children}
        </div>
    );
};

export default Popup