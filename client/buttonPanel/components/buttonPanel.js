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
        const { isShown, startSelected } = this.props;

        if(!isShown){
            return (null);
        }

        const {button, button_highlighted} = classNames;
        const button_panel = classNames['button-panel'];
        const highlightedClass = button + ' ' + button_highlighted;

        return (
            <div className={button_panel}>
                <button onClick={this.start} className={startSelected ? button : highlightedClass} disabled={startSelected}>Начать</button>
                <button onClick={this.finish} className={startSelected ? highlightedClass : button} disabled={!startSelected}>Закончить</button>
            </div>
        )
    }
}

ButtonPanel.propTypes = {
    isShown: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    startingTime: PropTypes.string.isRequired,
    startSelected: PropTypes.bool.isRequired,
    start: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired
};

export default connect(state => ({
    isShown: state.buttonPanel.isShown,
    username: state.buttonPanel.username,
    startingTime: state.buttonPanel.startingTime,
    startSelected: state.buttonPanel.startSelected
}), actions)(ButtonPanel)