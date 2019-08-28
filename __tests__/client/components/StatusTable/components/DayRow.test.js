import React from "react";
import moment from "moment";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import DayRow from "../../../../../client/components/StatusTable/components/DayRow";
import classNames from "../../../../../client/components/StatusTable/components/scss/StatusTable.module.scss";
import CurrentFullTimeCell from "../../../../../client/components/StatusTable/components/CurrentFullTimeCell";
import CurrentRealTimeCell from "../../../../../client/components/StatusTable/components/CurrentRealTimeCell";

Enzyme.configure({ adapter: new Adapter() });

function setup(dayConfig) {
    const {
        nameOfTheDay,
        numberOfTheDay,
        fullTime,
        realTime,
        timestamps,
    } = dayConfig;

    const workweek = {
        numberOfTheWeek: 1,
        daysOfTheWeek: [
            {
                finishTime: "2019-07-02T20:27:50.803Z",
                fullTime: fullTime || "10:03",
                nameOfTheDay: nameOfTheDay || "Вторник",
                numberOfTheDay: numberOfTheDay|| 2,
                numberOfTheWeek: 1,
                realTime: realTime || "10:00",
                startTime: "2019-07-02T10:24:46.168Z",
                timestamps: timestamps || [
                    {
                        finishTime: "23:27",
                        startTime: "13:24",
                    },
                ],
                _id: "red2019July2",
            },
        ],
    };

    const workday = workweek.daysOfTheWeek[0];
    const key = workday._id;
    const dayRowClasses = classNames["status-table__day-row"];

    const props = {
        workday,
        dayRowClasses,
        key,
    };
    const enzymeWrapper = shallow(<DayRow {...props} />);
    return {
        props,
        enzymeWrapper,
    };
}

describe("DayRow", () => {
    describe("conditional rendering", () => {

        it("should not render CurrentWorkTimeCell subcomponents", () => {
            const
                fullTime = "10:03",
                realTime = "10:00";

            const { enzymeWrapper } = setup({
                fullTime,
                realTime
            });

            expect(enzymeWrapper.contains([
                <td className={classNames["day-row__cell"]}>{fullTime}</td>,
                <td className={classNames["day-row__cell"]}>{realTime}</td>
            ])).toBe(true);

            expect(enzymeWrapper.contains([
                <CurrentFullTimeCell
                    className={classNames["day-row__cell"]}
                />,
                <CurrentRealTimeCell
                    className={classNames["day-row__cell"]}
                />
            ])).toBe(false);
        });

        it("should render CurrentWorkTimeCell subcomponents", () => {
            const numberOfTheDay = moment().date();
            const
                fullTime = "10:03",
                realTime = "10:00";

            const { enzymeWrapper } = setup({
                numberOfTheDay,
                fullTime,
                realTime
            });

            expect(enzymeWrapper.contains([
                <td className={classNames["day-row__cell"]}>{fullTime}</td>,
                <td className={classNames["day-row__cell"]}>{realTime}</td>
            ])).toBe(false);

            expect(enzymeWrapper.contains([
                <CurrentFullTimeCell
                    className={classNames["day-row__cell"]}
                />,
                <CurrentRealTimeCell
                    className={classNames["day-row__cell"]}
                />
            ])).toBe(true);
        });

    });
});