import React from "react";
import getClassNames from "../../../utilities/getClassnames";
import classNames from "./scss/ContractRows.module.scss";
import moment from "moment";

const ContractRows = ({ contracts }) =>
    contracts.map(contract => {
        const contractClasses = getClassNames({
            [classNames["contract-row"]]: true,
            [classNames["contract-row_active"]]: contract.status === "active",
        });

        const {
            id,
            status,
            hoursPerWeek,
            startingDay,
            endingDay,
            mentor,
            task,
        } = contract;

        const cells = [
            { data: id, className: "cell__contract-id" },
            { data: status },
            { data: hoursPerWeek },
            { data: moment(startingDay).format("YYYY-MM-DD") },
            { data: moment(endingDay).format("YYYY-MM-DD") },
            { data: mentor },
            { data: task },
        ];

        return (
            <tr className={contractClasses} key={contract.id}>
                {cells.map((cell, index)=> {
                    const cellClasses = getClassNames({
                        [classNames["cell"]]: true,
                        [classNames[cell.className]]: !!cell.className,
                    });

                    return (
                        <td className={cellClasses} key={cell.data + "-" +index}>
                            {cell.data}
                        </td>
                    );
                })}
            </tr>
        );
    });

export default ContractRows;