export const getSpecialDays = () => {
    return fetch("/getSpecialDays", {
        method: "GET",
        credentials: "include",
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw response.status;
        }
    });
};
