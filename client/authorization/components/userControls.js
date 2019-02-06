import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'
//import { SELECTORS } from '../../rootReducer'
import SignInDialog from './signInDialog'

const UserControls = (props) => {
    const { authorized} = props;

    if (!authorized) {
        return <SignInDialog />
    }

    return (
        <p>Logout</p>
    );
};

UserControls.propTypes = {
    authorized: PropTypes.bool.isRequired
};

export default connect(state => ({
        authorized: state.authorized//SELECTORS.AUTHORIZATION.AUTHORIZED(state)
    }
), actions)(UserControls)