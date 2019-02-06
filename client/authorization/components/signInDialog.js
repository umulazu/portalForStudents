import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { SELECTORS } from '../../rootReducer'
import {Button, Dialog} from "@material-ui/core";

class SignInDialog extends Component {
    constructor(props) {
        super(props);
        this.state = ({ isOpen: true });
        this.state.account = { email: '', password: '' }
    }

    handleOpen = () => {
        this.setState({ isOpen: true, logining: false })
    };

    handleClose = () => {
        this.state.account = { email: '', password: '' };
        this.setState({ isOpen: false })
    };

    signIn = () => {
        this.props.login({email: this.state.account.email, password: this.state.account.password})
    };

    handleChangedEmail = (email) => {
        console.log(email)
        this.setState({ account: {email: email, password: this.state.account.password} });
    };

    handleChangedPassword = (password) => {
        this.setState({ account: {email: this.state.account.email, password: password} });
    };

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <Button onClick={this.handleOpen}>
                    SignIn
                </Button>
                <Dialog
                    title='Sign in'
                    open={this.state.isOpen}
                    onClose={this.handleClose}>
                <label>email</label>
                <input type={"text"} onChange={(e) => this.handleChangedEmail(e.target.value)} value={this.state.account.email}/>
                <label>Password</label>
                <input type={"text"} onChange={(e) => this.handleChangedPassword(e.target.value)} value={this.state.account.password}/>
                <Button onClick={this.signIn}>Sign in</Button>
                </Dialog>
            </React.Fragment>
        )
    }
}

SignInDialog.propTypes = {
    authorizing: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
};

export default connect(state => ({
        authorizing: state.authorizing,
    }
), actions)(SignInDialog)