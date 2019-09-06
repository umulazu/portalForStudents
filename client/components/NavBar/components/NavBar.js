import React from "react";
import { useSelector } from "react-redux";
import classNames from "./scss/NavBar.module.scss";
import * as selectors from "../selectors";

const NavBar = () => {
    const authorized = useSelector(selectors.isAuthorized);
    if (!authorized) {
        return null;
    }

    // const markClasses = getClassNames({
    //     [classNames["student-name__active-mark_started"]]: isStarted,
    // });

    return (
        <div className={classNames["nav-bar"]}>
            <ul>
                <li>ОФИС</li>
                <li>МОЕ ВРЕМЯ</li>
                <li>МОИ КОНТРАКТЫ</li>
                <li>ЗАМЕТКИ</li>
            </ul>
        </div>
    );
};

export default NavBar;