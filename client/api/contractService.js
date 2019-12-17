import fetchWithToaster from "../utilities/connectFetchWithToaster";

export const getHoursPerDay = () =>
    fetchWithToaster("/api/contracts/getHoursPerDay", {
        method: "GET",
        credentials: "include",
    });

export const getContractsById = () =>
    fetchWithToaster("/api/contracts/getContracts", {
        method: "GET",
        credentials: "include",
    });