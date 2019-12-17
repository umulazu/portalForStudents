import fetchWithToaster from "../utilities/connectFetchWithToaster";

export const getStudent = () =>
    fetchWithToaster("/api/accounts/getStudentInfo", {
        method: "GET",
        credentials: "include",
    });

export const getDetailedWorkdaysForMonth = () =>
    fetchWithToaster("/api/workdays/getWorkdays", {
        method: "GET",
        credentials: "include",
    });