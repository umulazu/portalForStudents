import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../actions";
import Popup from "./Popup";
import SignInForm from "./SignInForm";
import * as selectors from "../selectors";

const SignInDialog = ({className}) => {
    const isShown = useSelector(selectors.isShown);
    const dispatch = useDispatch();
    const handleSignInClick = useCallback(() => dispatch(showForm()), [
        dispatch,
    ]);

    return (
        <React.Fragment>
            <button onClick={handleSignInClick} className={className}>
                Зайти в портал
            </button>
            {isShown && (
                <Popup>
                    <SignInForm />
                </Popup>
            )}
        </React.Fragment>
    );
};

export default SignInDialog;
