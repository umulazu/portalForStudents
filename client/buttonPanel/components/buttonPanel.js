import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../actions'
import getClassNames from '../../utilities/getClassnames'
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
        const { authorized, startSelected } = this.props;

        if(!authorized){
            return (null);
        }

        const {button} = classNames;
        const button_highlighted = classNames['button--highlighted'];
        const startClasses = getClassNames({[button]: true, [button_highlighted]: !startSelected});
        const finishClasses = getClassNames({[button]: true, [button_highlighted]: startSelected});

        const button_panel = classNames['button-panel'];

        return (
            <div className={button_panel}>
                <button onClick={this.start} className={startClasses} disabled={startSelected}>Начать</button>
                <button onClick={this.finish} className={finishClasses} disabled={!startSelected}>Закончить</button>
            </div>
        )
    }
}

ButtonPanel.propTypes = {
    authorized: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    startingTime: PropTypes.string.isRequired,
    startSelected: PropTypes.bool.isRequired,
    start: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired
};

export default connect(state => ({
    authorized: state.application.authorized,
    username: state.application.username,
    startingTime: state.buttonPanel.startingTime,
    startSelected: state.buttonPanel.startSelected
}), actions)(ButtonPanel)