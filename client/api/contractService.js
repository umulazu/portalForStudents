export const getHoursPerDay = _id => {
    return fetch("/hoursPerDay", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
    }).then(response => {
        return response.json();
    });
};
