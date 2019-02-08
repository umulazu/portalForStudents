import React, { Component } from 'react'
import Appbar from './appbar';
import classNames from './scss/appview.module.scss';

class AppView extends Component {
    render() {
        return (
            <div className={classNames.appview}>
                <Appbar/>
            </div>
        )
    }
}

export default AppView

