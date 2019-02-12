import React, { Component } from 'react'
import Popup from './popup';
import SignInForm from "./signInForm";
import classNames from "./scss/signInDialog.module.scss";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as actions from "../actions";

class SignInDialog extends Component {
    constructor(props) {
        super(props);
        this.state = ({ isOpen: false });
        this.account = { email: '', password: '' }
    }

    handleOpen = () => {
        this.setState({ isOpen: true})
    };
    handleClose = () => {
        this.setState({ isOpen: false })
    };

    signIn = () => {
        this.props.login({email: this.account.email, password: this.account.password})
    };

    render() {
        return (
            <React.Fragment>
                <button onClick={this.handleOpen}>
                    Sign in
                </button>
                <Popup open={this.state.isOpen}>
                <dialog
                    open={this.state.isOpen}
                    title='Sign in'
                    className={classNames.dialog}>
                    <div className={classNames.flex_form}>
                        <h3>LOGIN</h3>
                        <SignInForm account={this.account} class={classNames.input}/>
                        <button onClick={this.handleClose}>Cancel</button>
                        <button onClick={this.signIn}>Sign in</button>
                    </div>
                </dialog>
                </Popup>
            </React.Fragment>
        )
    }
}
SignInDialog.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(null, actions)(SignInDialog)