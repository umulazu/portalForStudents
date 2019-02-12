import React from 'react'
import PropTypes from 'prop-types'

const LoginInput = (props) => {
    const handleChange = (event) => {
        props.onChange(event.target.value)
    };

    return (
        <React.Fragment>
            <input type={props.type} placeholder={props.placeholder} onChange={handleChange} value={props.value} className={props.class}/>
            <br/>
        </React.Fragment>
    )
}


LoginInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    class: PropTypes.string,
    placeholder: PropTypes.string,
};

export default LoginInput