import React from "react";
import { render, configure, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import WeekRow from "../../../../../client/components/StatusTable/components/WeekRow";
import DayRow from "../../../../../client/components/StatusTable/components/DayRow";
import classNames from "../../../../../client/components/StatusTable/components/scss/StatusTable.module.scss";

configure({ testIdAttribute: "data-test-component" });

describe('WeekRow component', () => {
    it("should change state when tag <tr> is clicked", () => {
        const workweek = {
            numberOfTheWeek: 1,
            daysOfTheWeek: [
                {
                    finishTime: "2019-07-02T20:27:50.803Z",
                    fullTime: "10:03",
                    nameOfTheDay: "Вторник",
                    numberOfTheDay: 2,
                    numberOfTheWeek: 1,
                    realTime: "10:00",
                    startTime: "2019-07-02T10:24:46.168Z",
                    timestamps: [
                        {
                            finishTime: "23:27",
                            startTime: "13:24",
                        },
                    ],
                    _id: "red2019July2",
                },
            ],
        };

        // todo: this 3 tests move to 3 it tests with 1 before all setup
        const tbody = document.createElement("tbody");
        const { getByTestId, queryAllByTestId } = render(
            <WeekRow
                workweek={workweek}
                weekRowClasses={classNames["status-table__week-row"]}
                dayRowClasses={classNames["status-table__day-row"]}
                key={workweek.numberOfTheWeek}
            />,
            {
                container: document.body.appendChild(tbody),
            }
        );

        // showed
        let DayRows = queryAllByTestId("DayRow");
        expect(DayRows).toHaveLength(1);

        // collapsed
        fireEvent.click(
            getByTestId("WeekClick")
        );
        DayRows = queryAllByTestId("DayRow");
        expect(DayRows).toHaveLength(0);

        // showed
        fireEvent.click(
            getByTestId("WeekClick")
        );
        DayRows = queryAllByTestId("DayRow");
        expect(DayRows).toHaveLength(1);
    });
});