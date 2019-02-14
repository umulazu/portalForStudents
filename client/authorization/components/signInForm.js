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
        const {signIn_form, signIn_headline, signIn_input, signIn_button_panel, signIn_button} = classNames;

        return (
            <div className={signIn_form}>
                <h3 className={signIn_headline}>LOGIN</h3>
                <input
                    type='text'
                    placeholder="email"
                    onChange={this.handleChangedEmail}
                    value={email}
                    className={signIn_input}/>
                <input
                    type='text'
                    placeholder="password"
                    onChange={this.handleChangedPassword}
                    value={password}
                    className={signIn_input}/>

                <div className={signIn_button_panel}>
                    <button onClick={this.signIn} className={signIn_button}>Sign in</button>
                    <button onClick={hideForm} className={signIn_button}>Cancel</button>
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