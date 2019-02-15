import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../actions'
import classNames from './scss/signInForm.module.scss'

class ButtonPanel extends Component {
    handleChangedEmail = (event) => {

    };

    render() {
        const {} = this.props;
        const {button} = classNames;
        const button_panel = classNames['button-panel'];

        return (
            <div className={button_panel}>
                <button onClick={} className={button}>Начать</button>
                <button onClick={} className={button}>Закончить</button>
            </div>
        )
    }
}

ButtonPanel.propTypes = {
    login: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    enterEmail: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default connect(state => ({
}), actions)(ButtonPanel)