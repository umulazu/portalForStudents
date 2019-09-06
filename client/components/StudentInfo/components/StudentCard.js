import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "./scss/StudentCard.module.scss";
import * as selectors from "../selectors";
import * as rootSelectors from "../../../rootSelectors";
import { loadStudentRoutine } from "../actions";
import getFullDate from "../../../utilities/getFullDate";

const StudentCard = () => {
    const dispatch = useDispatch();

    const authorized = useSelector(selectors.isAuthorized);
    const login = useSelector(rootSelectors.getStudentId);
    const { mentor, birthday } = useSelector(selectors.getStudentInfo);
    useEffect(
        () => {
            authorized && login && dispatch(loadStudentRoutine.trigger({ login }))
        }, [login, dispatch, authorized]
    );
    if (!authorized || !(mentor && birthday)) {
        return null;
    }

    const date = getFullDate(new Date(birthday));

    const rows = [
        {
            header: "День рождения:",
            data: date.date,
        },
        {
            header: "Ментор:",
            data: mentor,
        },
        {
            header: "Нечто:",
            data: "еще",
        },
    ];
    return (
        <div className={classNames["student-card"]}>
            <table>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.header}>
                            <td>
                                <span className={classNames["info-header"]}>
                                    {row.header}
                                </span>
                            </td>
                            <td>{row.data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentCard;