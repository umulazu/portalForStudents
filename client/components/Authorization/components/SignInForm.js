import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "./scss/SignInForm.module.scss";
import * as selectors from "../selectors";
import { loginRoutine, hideForm, enterLogin, enterPassword } from "../actions";

const SignInForm = () => {
    const dispatch = useDispatch();
    const login = useSelector(selectors.login);
    const password = useSelector(selectors.password);
    const handleHideFormClick = () => {
        dispatch(hideForm());
    };

    const handleChangedLogin = event => {
        const login = event.target.value;
        dispatch(enterLogin({ login }));
    };

    const handleChangedPassword = event => {
        const password = event.target.value;
        dispatch(enterPassword({ password }));
    };

    const handleSignInClick = useCallback(
        () => dispatch(loginRoutine.trigger({ login, password })),
        [dispatch, login, password]
    );

    const {
        signIn__form,
        signIn__headline,
        signIn__input,
        signIn__button,
    } = classNames;
    const signIn__button_panel = classNames["signIn__button-panel"];

    return (
        <div className={signIn__form}>
            <h3 className={signIn__headline}>Аутентификация</h3>
            <input
                type="text"
                placeholder="Логин"
                onChange={handleChangedLogin}
                value={login}
                className={signIn__input}
            />
            <input
                type="text"
                placeholder="Пароль"
                onChange={handleChangedPassword}
                value={password}
                className={signIn__input}
            />

            <div className={signIn__button_panel}>
                <button onClick={handleSignInClick} className={signIn__button}>
                    Вход
                </button>
                <button
                    onClick={handleHideFormClick}
                    className={signIn__button}
                >
                    Отмена
                </button>
            </div>
        </div>
    );
};

export default SignInForm;
