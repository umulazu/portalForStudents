import React from "react";
import getClassNames from "../../../utilities/getClassnames";
import classNames from "./scss/HeaderRow.module.scss";

const HeaderRow = ({ headers, className }) => (
    <tr>
        {headers.map(header => {
            const headerClasses = getClassNames({
                [className]: true,
                [classNames["head-cell"]]: true,
                [classNames["head-cell__contract-id"]]:
                    header.title === "Идентификатор контракта",
            });

            return (
                <th className={headerClasses} key={header.title}>
                    {header.title}
                </th>
            );
        })}
    </tr>
);

export default HeaderRow;