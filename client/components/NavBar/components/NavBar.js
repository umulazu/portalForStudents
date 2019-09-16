import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "./scss/NavBar.module.scss";
import * as selectors from "../selectors";
import getClassNames from "../../../utilities/getClassnames";

const NavBar = () => {
    const authorized = useSelector(selectors.isAuthorized);
    const [focusedIndexOfElement, setFocusedIndexOfElement ] = useState(0);
    const handleClick = useCallback((index) => {
        setFocusedIndexOfElement(index);
    }, []);

    if (!authorized) {
        return null;
    }

    const rawMenuItems = [
        "ОФИС",
        "МОЕ ВРЕМЯ",
        "МОИ КОНТРАКТЫ",
        "ЗАМЕТКИ"
    ];
    const menuItems = modifyMenuItems(rawMenuItems, focusedIndexOfElement, handleClick);

    // const menuItems = [
    //     "ОФИС",
    //     "МОЕ ВРЕМЯ",
    //     "МОИ КОНТРАКТЫ",
    //     "ЗАМЕТКИ"
    // ].map((item, index)=> {
    //     const classes = getClassNames({
    //         [classNames["list__list-item"]]: true,
    //         [classNames["list__list-item_focused"]]:
    //             focusedIndexOfElement === index,
    //     });
    //     return (
    //         <li className={classes}
    //             onClick={
    //                 (e) => handleClick(index, e)
    //             }
    //             key={index}
    //         >
    //             {item}
    //         </li>
    //     );
    // });

    return (
        <div className={classNames["nav-bar"]}>
            <ul className={classNames["list"]}>
                {menuItems}
            </ul>
        </div>
    );
};

export default NavBar;


const modifyMenuItems = (rawMenuItems, focusedIndexOfElement, handleClick) => {
    return rawMenuItems.map((item, index)=> {
        const classes = getClassNames({
            [classNames["list__list-item"]]: true,
            [classNames["list__list-item_focused"]]:
            focusedIndexOfElement === index,
        });
        return (
            <li className={classes}
                onClick={
                    (e) => handleClick(index, e)
                }
                key={index}
            >
                {item}
            </li>
        );
    });
};