import months from '../constants/months'
import daysOfWeek from '../constants/daysOfWeek'

export default (date) => {
    const month = months[date.getMonth()].nameAfterDate;

    return {
        date: date.getDate() + ' ' + month + ' ' + date.getFullYear(),
        dayOfWeek: daysOfWeek[date.getDay()]
    }
}