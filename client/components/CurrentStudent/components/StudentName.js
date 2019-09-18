import React from "react";
import { useSelector } from "react-redux";
import classNames from "./scss/StudentName.module.scss";
import * as selectors from "../selectors";
import * as rootSelectors from "../../../rootSelectors";
import getClassNames from "../../../utilities/getClassnames";

const StudentName = () => {
    const name = useSelector(selectors.getNameOfStudent);
    const isStarted = useSelector(rootSelectors.isStarted);

    const markClasses = getClassNames({
        [classNames["student-name__active-mark_started"]]: isStarted,
    });

    return (
        <div className={classNames["student-name"]}>
            <span className={markClasses}>&hearts; </span>
            {name}
        </div>
    );
};

export default StudentName;