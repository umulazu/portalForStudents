const areEqualDates = (a, b) => {
    if(a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()){
        return true;
    }
    return false;
};

export default areEqualDates