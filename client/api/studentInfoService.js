export const getStudent = _id => {
    return fetch("/studentInfo", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
    }).then(response => {
        if (response.status === 200) {
            return response.json().then(data => ({
                mentor: data.mentor,
                birthday: data.birthday
            }));
        } else {
            throw response.status;
        }
    });
};

export const getWorkdaysFoMronth = _id => {
    return fetch("/workdays", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
    }).then(response => response.json());
};

export const getDetailedWorkdaysForMonth = _id => {
    return fetch("/detailedWorkdays", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
    }).then(response => response.json());
};
