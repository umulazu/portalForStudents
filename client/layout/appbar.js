import React, { Component } from 'react'
import UserControls from '../authorization/components/userControls'
import DateControl from '../components/dateControl'

class Appbar extends Component {
    render() {
        return (
            <React.Fragment>
            <DateControl/>
            <UserControls />
            </React.Fragment>
        )
    }
}

export default Appbar
