import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignInDialog from "./SignInDialog";
import * as selectors from "../selectors";
import { logoutRoutine } from "../actions";

const UserControls = ({className}) => {
    const dispatch = useDispatch();
    const handleLogOutClick = useCallback(
        () => dispatch(logoutRoutine.trigger()),
        [dispatch]
    );

    const authorized = useSelector(selectors.isAuthorized);
    if (!authorized) {
        return <SignInDialog className={className}/>;
    }

    return (
        <button onClick={handleLogOutClick} className={className}>
            Покинуть портал
        </button>
    );
};

export default UserControls;
