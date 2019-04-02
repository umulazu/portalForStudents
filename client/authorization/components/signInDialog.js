import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Popup from './popup';
import SignInForm from './signInForm';
import SignUpForm from './signUpForm';
import classNames from './scss/button.module.scss';
import TabBar from '../../components/tabBar';
import classNames1 from './scss/signInForm.module.scss'

class SignInDialog extends Component {
    constructor(props){
        super(props);
        this.state = {selectedId: 1};
    }

    handleChanged = (tab) => {
        const {showForm} = this.props;
        this.setState({selectedId: tab});
        showForm();
    };

    render() {
        const {isShown} = this.props;
        const {appbar__button} = classNames;

        let tabs=[
            {
                id: 1,
                text: "Sign in"
            },
            {
                id: 2,
                text: "Sign up"
            }
        ];

        return (
            <React.Fragment>
                <button onClick={() => {this.handleChanged(1)}} className={appbar__button}>
                    Sign in
                </button>
                <button onClick={() => {this.handleChanged(2)}} className={appbar__button}>
                    Sign up
                </button>
                {
                    isShown &&
                    <Popup>
                        <div className={classNames1.signIn__form}>
                            <TabBar handleChanged={this.handleChanged} tabs={tabs} selectedId={this.state.selectedId}/>
                            {
                                (this.state.selectedId.toString() === "1") &&
                                <SignInForm/>
                            }
                            {
                                (this.state.selectedId.toString() === "2") &&
                                <SignUpForm/>
                            }
                                </div>
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