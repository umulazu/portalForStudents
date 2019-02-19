import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'
import SignInDialog from './signInDialog'
import classNames from "./scss/button.module.scss";

const UserControls = (props) => {
    const { authorized, logout} = props;
    if (!authorized) {
        return <SignInDialog/>
    }

    const {appbar__button} = classNames;
    return (

        <button onClick={logout} className={appbar__button}>
            Sign out
        </button>
    );
};

UserControls.propTypes = {
    authorized: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default connect(state => ({
        authorized: state.authorization.authorized
    }
), actions)(UserControls)