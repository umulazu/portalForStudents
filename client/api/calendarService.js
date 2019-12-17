import fetchWithToaster from "../utilities/connectFetchWithToaster";

export const getSpecialDays = () =>
    fetchWithToaster("/api/specialDays/getSpecialDays", {
        method: "GET",
        credentials: "include",
    });