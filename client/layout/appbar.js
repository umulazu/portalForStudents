import React, { Component } from 'react'
import UserControls from '../authorization/components/userControls'
import DateControl from '../components/dateControl'
import classNames from './scss/appbar.module.scss';

class Appbar extends Component {
    render() {
        return (
            <div className={classNames.appbar}>
                <DateControl/>
                <UserControls/>
            </div>
        )
    }
}

export default Appbar
