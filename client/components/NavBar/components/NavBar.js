import React from "react";
import { useSelector } from "react-redux";
import classNames from "./scss/NavBar.module.scss";
import * as selectors from "../selectors";
import MenuItems from "./MenuItems";

const NavBar = () => {
    const authorized = useSelector(selectors.isAuthorized);

    if (!authorized) {
        return null;
    }

    const rawMenuItems = [
        {
            title: "ОФИС",
            path: "/office",
        },
        {
            title: "МОЕ ВРЕМЯ",
            path: "/",
        },
        {
            title: "МОИ КОНТРАКТЫ",
            path: "/contracts",
        },
        {
            title: "ЗАМЕТКИ",
            path: "/remarks",
        },
    ];

    return (
        <div className={classNames["nav-bar"]}>
            <ul className={classNames["list"]}>
                <MenuItems
                    rawMenuItems={rawMenuItems}
                    className={classNames["list__item"]}
                />
            </ul>
        </div>
    );
};

export default NavBar;