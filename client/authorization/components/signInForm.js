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
        this.props.signin({email, password});
    };

    render() {
        const {email, password, hideForm} = this.props;
        const {signIn__form, signIn__input, signIn__button} = classNames;
        const signIn__button_panel = classNames['signIn__button-panel'];

        return (
            <div className={signIn__form}>
                <input
                    type='text'
                    placeholder="email"
                    onChange={this.handleChangedEmail}
                    value={email}
                    className={signIn__input}/>
                <input
                    type='text'
                    placeholder="password"
                    onChange={this.handleChangedPassword}
                    value={password}
                    className={signIn__input}/>

                <div className={signIn__button_panel}>
                    <button onClick={this.signIn} className={signIn__button}>Sign in</button>
                    <button onClick={hideForm} className={signIn__button}>Cancel</button>
                </div>
            </div>
        )
    }
}

SignInForm.propTypes = {
    signin: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    enterEmail: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default connect(state => ({
    email: state.authorization.email,
    password: state.authorization.password
}), actions)(SignInForm)