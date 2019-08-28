export default (hours, minutes) => {
    return hours + ":" + ("0" + minutes).slice(-2);
};
