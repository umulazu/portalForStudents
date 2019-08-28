import React, { useEffect } from "react";

const useInterval = (setIntervalHandler, clearIntervalHandler) => {
    useEffect(() => {
        let timer_id;

        timer_id = setInterval(() => {
            setIntervalHandler();
        }, 60 * 1000);


        return () => {
            clearIntervalHandler();
            clearInterval(timer_id);
        };
    }, [setIntervalHandler, clearIntervalHandler]);
};

export default useInterval;