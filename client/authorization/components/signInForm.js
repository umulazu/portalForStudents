import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../actions'
import classNames from './scss/signInForm.module.scss'

class SignInForm extends Component {
    handleChangedEmail = (event) => {
        const email = event.target.value;
        this.props.enterEmail({email});
    };

    handleChangedPassword = (event) => {
        const password = event.target.value;
        this.props.enterPassword({password});
    };

    signIn = () => {
        const {email, password} = this.props;
        this.props.login({email, password});
    };

    render() {
        const {email, password, hideForm} = this.props;
        const {form, headline, input, button_panel, button} = classNames;

        return (
            <div className={form}>
                <h3 className={headline}>LOGIN</h3>
                <input
                    type='text'
                    placeholder="email"
                    onChange={this.handleChangedEmail}
                    value={email}
                    className={input}/>
                <input
                    type='text'
                    placeholder="password"
                    onChange={this.handleChangedPassword}
                    value={password}
                    className={input}/>

                <div className={button_panel}>
                    <button onClick={this.signIn} className={button}>Sign in</button>
                    <button onClick={hideForm} className={button}>Cancel</button>
                </div>
            </div>
        )
    }
}

SignInForm.propTypes = {
    login: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    enterEmail: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default connect(state => ({
    email: state.email,
    password: state.password
}), actions)(SignInForm)