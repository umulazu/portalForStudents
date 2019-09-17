import React, { useEffect } from "react";
import { contractsLoadRoutine } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../selectors";
import moment from "moment";
import classNames from "./scss/ContractInfo.module.scss";
import getClassNames from "../../../utilities/getClassnames";

const ContractInfo = ({ className }) => {
    const dispatch = useDispatch();
    const contracts = useSelector(selectors.getContracts);

    useEffect(() => {
        dispatch(contractsLoadRoutine());
    }, [dispatch]);

    const headers = [
        { title: "Идентификатор контракта" },
        { title: "Статус" },
        { title: "Кол-во часов в неделю" },
        { title: "Дата вступления в силу" },
        { title: "Дата окончания" },
        { title: "Ментор" },
        { title: "Задание" },
    ];

    const tableClasses = getClassNames({
        [className]: true,
        [classNames["contract-table"]]: true,
    });
    return (
        <table className={tableClasses}>
            <colgroup className={classNames["contract-table__id"]} />
            <colgroup className={classNames["contract-table__status"]} />
            <colgroup className={classNames["contract-table__hours-per-day"]} />
            <colgroup className={classNames["contract-table__start-time"]} />
            <colgroup className={classNames["contract-table__finish-time"]} />
            <colgroup className={classNames["contract-table__mentor"]} />
            <colgroup className={classNames["contract-table__task"]} />

            <thead>
                <tr>{headersToJSX(headers)}</tr>
            </thead>

            <tbody>{contractsToJSX(contracts)}</tbody>
        </table>
    );
};

export default ContractInfo;

const headersToJSX = headers =>
    headers.map(header => {
        const headerClasses = getClassNames({
            [classNames["contract-table__head-cell"]]: true,
            [classNames["contract-table__head-cell_contract-id"]]:
                header.title === "Идентификатор контракта",
        });

        return (
            <th className={headerClasses} key={header.title}>
                {header.title}
            </th>
        );
    });

const contractsToJSX = contracts =>
    contracts.map(contract => {
        const contractClasses = getClassNames({
            [classNames["contract-table__contract-row"]]: true,
            [classNames["contract-table__contract-row_active"]]:
                contract.status === "active",
        });

        const {
            _id,
            status,
            hoursPerWeek,
            startingDay,
            endingDay,
            mentor,
            task,
        } = contract;

        const cells = [
            { data: _id, className: "cell__contract-id" },
            { data: status },
            { data: hoursPerWeek },
            { data: moment(startingDay).format("YYYY-MM-DD") },
            { data: moment(endingDay).format("YYYY-MM-DD") },
            { data: mentor },
            { data: task },
        ];

        return (
            <tr className={contractClasses} key={contract._id}>
                {cells.map(cell => {
                    const cellClasses = getClassNames({
                        [classNames["cell"]]: true,
                        [classNames[cell.className]]: !!cell.className,
                    });

                    return (
                        <td className={cellClasses} key={cell.data}>
                            {cell.data}
                        </td>
                    );
                })}
            </tr>
        );
    });