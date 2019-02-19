import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../actions'
import classNames from './scss/buttonPanel.module.scss'

class ButtonPanel extends Component {
    start = () => {
        const time = new Date().toString();
        this.props.start({time});
    };

    finish = () => {
        const {username, startingTime} = this.props;
        const finish = new Date().toString();
        this.props.finish({ username, date: finish, start: startingTime, finish });
    };

    render() {
        const {isShown} = this.props;

        if(!isShown){
            return (null);
        }

        const {button} = classNames;
        const button_panel = classNames['button-panel'];

        return (
            <div className={button_panel}>
                <button onClick={this.start} className={button}>Начать</button>
                <button onClick={this.finish} className={button}>Закончить</button>
            </div>
        )
    }
}

ButtonPanel.propTypes = {
    isShown: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    startingTime: PropTypes.string.isRequired,
    start: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired
};

export default connect(state => ({
    isShown: state.buttonPanel.isShown,
    username: state.buttonPanel.username,
    startingTime: state.buttonPanel.startingTime
}), actions)(ButtonPanel)