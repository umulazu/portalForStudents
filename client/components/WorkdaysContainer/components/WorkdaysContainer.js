import React, { useEffect } from "react";
import { workdaysLoad, workdaysContainerClose } from "../../WorkdaysContainer/actions";
import { useDispatch } from "react-redux";

const WorkdaysContainer = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(workdaysLoad.trigger());

        return () => {
            dispatch(workdaysContainerClose());
        }
    }, [dispatch]);

    return <React.Fragment>{props.children}</React.Fragment>;
};

export default WorkdaysContainer;