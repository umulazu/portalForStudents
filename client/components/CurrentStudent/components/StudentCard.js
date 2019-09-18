import React from "react";
import {  useSelector } from "react-redux";
import classNames from "./scss/StudentCard.module.scss";
import * as selectors from "../selectors";
import getFullDate from "../../../utilities/getFullDate";

const StudentCard = () => {
    const { mentor, birthday } = useSelector(selectors.getStudentInfo);

    if (!(mentor && birthday)) {
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