const getDiffBetweenTime = (time) => {
    const startingDate = new Date(time.startingTime);
    const endingDate = new Date(time.endingTime);
    return (endingDate - startingDate) / 60000; // milliseconds -> minutes
}

export default getDiffBetweenTime