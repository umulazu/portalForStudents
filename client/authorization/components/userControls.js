import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'
import SignInDialog from './signInDialog'

const UserControls = (props) => {
    const { authorized, logout} = props;

    if (!authorized) {
        return <SignInDialog />
    }

    return (
        <button onClick={logout}>
            Sign out
        </button>
    );
};

UserControls.propTypes = {
    authorized: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default connect(state => ({
        authorized: state.authorized
    }
), actions)(UserControls)