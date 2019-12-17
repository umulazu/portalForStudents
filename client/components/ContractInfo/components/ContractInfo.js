import React, { useEffect } from "react";
import { contractsLoadRoutine, contractsCloseRoutine } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../selectors";
import classNames from "./scss/ContractInfo.module.scss";
import getClassNames from "../../../utilities/getClassnames";
import HeaderRow from "./HeaderRow";
import ContractRows from "./ContractRows";

const ContractInfo = ({ className }) => {
    const dispatch = useDispatch();
    const contracts = useSelector(selectors.getContracts);

    useEffect(() => {
        dispatch(contractsLoadRoutine.trigger());
        return () => {
            dispatch(contractsCloseRoutine());
        };
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
                <HeaderRow
                    headers={headers}
                    className={classNames["contract-table__head-cell"]}
                />
            </thead>

            <tbody>
                {contracts.length ? <ContractRows contracts={contracts} /> : null}
            </tbody>
        </table>
    );
};

export default ContractInfo;