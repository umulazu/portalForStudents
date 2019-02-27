import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Popup from './popup';
import SignInForm from './signInForm';
import classNames from './scss/button.module.scss';

class SignInDialog extends Component {
    render() {
        const {isShown, showForm} = this.props;
        const {appbar__button} = classNames;

        return (
            <React.Fragment>
                <button onClick={showForm} className={appbar__button}>
                    Sign in
                </button>
                {
                    isShown &&
                    <Popup>
                        <SignInForm/>
                    </Popup>
                }
            </React.Fragment>
        )
    }
}
SignInDialog.propTypes = {
    isShown: PropTypes.bool.isRequired,
    showForm: PropTypes.func.isRequired,
};

export default connect(state => ({
    isShown: state.authorization.isShown
}), actions)(SignInDialog)