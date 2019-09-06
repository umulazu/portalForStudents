export const login = (_id, password) => {
    return fetch("/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, password }),
    }).then(response => response.json().then(data => ({
        id: data._id,
        name: data.name
    })));
};

export const logout = () => {
    return fetch("/logout", {
        method: "GET",
        credentials: "include",
    }).then(response => {
        if (response.status === 200) {
            return true;
        } else {
            throw response.status;
        }
    });
};
