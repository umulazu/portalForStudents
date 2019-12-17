import fetchWithToaster from "../utilities/connectFetchWithToaster";

export const start = () =>
    fetchWithToaster("/api/workdays/addStartTime", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

export const finish = () =>
    fetchWithToaster("/api/workdays/addFinishTime", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

export const getCurrentDay = () =>
    fetchWithToaster("/api/workdays/getCurrentDay", {
        method: "GET",
        credentials: "include",
    });