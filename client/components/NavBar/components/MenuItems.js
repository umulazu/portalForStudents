import React from "react";
import getClassNames from "../../../utilities/getClassnames";
import classNames from "./scss/MenuItems.module.scss";
import { NavLink } from "react-router-dom";

const MenuItems = ({ rawMenuItems, className }) =>
    rawMenuItems.map((item, index) => {
        const liClasses = getClassNames({
            [className]: true,
        });

        const navLinkClasses = getClassNames({
            [className]: true,
            [classNames["empty"]]: true,
            [classNames["menu-items"]]: true,
        });

        return (
            <li className={liClasses} key={index}>
                <NavLink
                    exact
                    to={item.path}
                    className={navLinkClasses}
                    activeClassName={classNames["active"]}
                >
                    {item.title}
                </NavLink>
            </li>
        );
    });

export default MenuItems;