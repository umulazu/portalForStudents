const areEqualDates = (a, b) => {
    const d1 = new Date(a);
    const d2 = new Date(b);
    if (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    ) {
        return true;
    }
    return false;
};

export default areEqualDates;
