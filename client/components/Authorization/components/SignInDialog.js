import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../actions";
import Popup from "./Popup";
import SignInForm from "./SignInForm";
import classNames from "./scss/Button.module.scss";
import * as selectors from "../selectors";

const SignInDialog = () => {
    const isShown = useSelector(selectors.isShown);
    const dispatch = useDispatch();
    const handleSignInClick = useCallback(() => dispatch(showForm()), [
        dispatch,
    ]);

    const { appbar__button } = classNames;

    return (
        <React.Fragment>
            <button onClick={handleSignInClick} className={appbar__button}>
                Sign in
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
