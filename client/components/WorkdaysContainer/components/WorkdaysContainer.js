import React, { useEffect } from "react";
import { workdaysLoad } from "../../WorkdaysContainer/actions";
import { useDispatch } from "react-redux";

const WorkdaysContainer = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(workdaysLoad.trigger());
    }, [dispatch]);

    return <React.Fragment>{props.children}</React.Fragment>;
};

export default WorkdaysContainer;