import React from "react";
import getClassNames from "../../../utilities/getClassnames";
import classNames from "./scss/MenuItems.module.scss";

const MenuItems = ({
    rawMenuItems,
    focusedIndexOfElement,
    handleClick,
    className,
}) =>
    rawMenuItems.map((item, index) => {
        const classes = getClassNames({
            [className]: true,
            [classNames["menu-items"]]: true,
            [classNames["menu-items_focused"]]:
                focusedIndexOfElement === index,
        });
        return (
            <li
                className={classes}
                onClick={e => handleClick(index, e)}
                key={index}
            >
                {item}
            </li>
        );
    });

export default MenuItems;