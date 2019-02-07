import React, {Component} from 'react'
import getFullDate from '../utilities/getFullDate'

class DateControl extends Component {
    render() {
        const date = getFullDate(new Date());

        return (
            <React.Fragment>
                <h3>{date.date}</h3>
                <h3>{date.dayOfWeek}</h3>
            </React.Fragment>
        )
    }
}

export default DateControl
