import fetchWithToaster from "../utilities/connectFetchWithToaster";

export const login = (id, password) =>
    fetchWithToaster("/api/accounts/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserName: id, password }),
    });

export const logout = () =>
    fetchWithToaster("/api/accounts/logout", {
        method: "GET",
        credentials: "include",
    });