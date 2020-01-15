export default (hours, minutes) => {
    const hoursLength = hours.toString().length;
    const shiftLength = hoursLength < 2 ? -2 : 0;
    return ((shiftLength ? "0" : "") + hours).slice(shiftLength) + ":" + ("0" + minutes).slice(-2);
};
