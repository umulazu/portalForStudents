import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoginInput from './loginInput'

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }
    }

    handleChangedEmail = (email) => {
        this.props.account.email = email;
        this.setState({ email });
    };

    handleChangedPassword = (password) => {
        this.props.account.password = password;
        this.setState({ password });
    };

    render() {
        return (
            <React.Fragment>
                <LoginInput type='text' placeholder="email" onChange={this.handleChangedEmail} value={this.state.email} class={this.props.class}/>
                <LoginInput type='text' placeholder="password" onChange={this.handleChangedPassword} value={this.state.password} class={this.props.class}/>
            </React.Fragment>
        )
    }
}

SignInForm.propTypes = {
    account: PropTypes.object.isRequired,
    class: PropTypes.string,
};

export default SignInForm