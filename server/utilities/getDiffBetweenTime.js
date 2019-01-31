const getDiffBetweenTime = (time) => {
    const date = '1970-01-01T';
    const startingDate = new Date(date + time.startingTime + 'Z');
    const endingDate = new Date(date + time.endingTime + 'Z');
    return (endingDate - startingDate) / 60000; // milliseconds -> minutes
}

export default getDiffBetweenTime