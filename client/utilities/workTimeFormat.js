export default (hours, minutes) => {
    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
};
