import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../actions'
import classNames from './scss/buttonPanel.module.scss'

class ButtonPanel extends Component {
    start = () => {
        const time = new Date();
        this.props.start({time});
    };

    finish = () => {
        //{ username, date, start, finish }

        const {username, startingTime} = this.props;
        const start = startingTime;
        const date = new Date();
        const finish = new Date();
        this.props.finish({ username, date, start, finish });
    };

    render() {
        const {isShown} = this.props;
        console.log(isShown);
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
    startingTime: PropTypes.instanceOf(Date).isRequired,
    start: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired
};

export default connect(state => ({
    isShown: state.buttonPanel.isShown,
    username: state.buttonPanel.username,
    startingTime: state.buttonPanel.startingTime
}), actions)(ButtonPanel)