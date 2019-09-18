import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "./scss/NavBar.module.scss";
import * as selectors from "../selectors";
import { changePageRoutine } from "../actions";
import MenuItems from "./MenuItems";

const NavBar = () => {
    const dispatch = useDispatch();
    const authorized = useSelector(selectors.isAuthorized);
    const pageNumber = useSelector(selectors.getPageNumber);
    const [focusedIndexOfElement, setFocusedIndexOfElement] = useState(
        pageNumber
    );
    const handleClick = useCallback(
        index => {
            dispatch(changePageRoutine({ index }));
            setFocusedIndexOfElement(index);
        },
        [dispatch]
    );

    if (!authorized) {
        return null;
    }

    const rawMenuItems = ["ОФИС", "МОЕ ВРЕМЯ", "МОИ КОНТРАКТЫ", "ЗАМЕТКИ"];

    return (
        <div className={classNames["nav-bar"]}>
            <ul className={classNames["list"]}>
                <MenuItems
                    rawMenuItems={rawMenuItems}
                    focusedIndexOfElement={focusedIndexOfElement}
                    handleClick={handleClick}
                    className={classNames["list__list-item"]}
                />
            </ul>
        </div>
    );
};

export default NavBar;