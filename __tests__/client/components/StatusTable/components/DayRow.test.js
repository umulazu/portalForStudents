import React from "react";
import { Provider } from "react-redux";
import moment from "moment";
import { configure, render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";

import DayRow from "../../../../../client/components/StatusTable/components/DayRow";
import classNames from "../../../../../client/components/StatusTable/components/scss/StatusTable.module.scss";
import CurrentFullTimeCell from "../../../../../client/components/StatusTable/components/CurrentFullTimeCell";
import CurrentRealTimeCell from "../../../../../client/components/StatusTable/components/CurrentRealTimeCell";
import * as rootSelectors from "../../../../../client/rootSelectors";

jest.mock("../../../../../client/rootSelectors");
const middlewares = [];
const mockStore = configureMockStore(middlewares);

configure({ testIdAttribute: "data-test-component" });

function getProps(dayConfig) {
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
                ...dayConfig,
            },
        ],
    };

    const workday = workweek.daysOfTheWeek[0];
    const key = workday._id;
    const dayRowClasses = classNames["status-table__day-row"];

    return {
        workday,
        dayRowClasses,
        key,
    };
}

function TestableDayRow(props) {
    const initialState = {};
    const store = mockStore(initialState);
    const tbody = document.createElement("tbody");
    const { queryAllByTestId } = render(
        <Provider store={store}>
            <DayRow {...props} />
        </Provider>,
        {
            container: document.body.appendChild(tbody),
        });

    const assertFullTimeCellDoesNotExist = () => {
        const FullTimeCell = queryAllByTestId("FullTimeCell");
        expect(FullTimeCell).toHaveLength(0);
    };
    const assertFullTimeCellExists = () => {
        const FullTimeCell = queryAllByTestId("FullTimeCell");
        expect(FullTimeCell).toHaveLength(1);
    };

    const assertRealTimeCellDoesNotExist = () => {
        const RealTimeCell = queryAllByTestId("RealTimeCell");
        expect(RealTimeCell).toHaveLength(0);
    };
    const assertRealTimeCellExists = () => {
        const RealTimeCell = queryAllByTestId("RealTimeCell");
        expect(RealTimeCell).toHaveLength(1);
    };

    const assertCurrentFullTimeCellDoesNotExist = () => {
        const CurrentFullTimeCell = queryAllByTestId("CurrentFullTimeCell");
        expect(CurrentFullTimeCell).toHaveLength(0);
    };
    const assertCurrentFullTimeCellExists = () => {
        const CurrentFullTimeCell = queryAllByTestId("CurrentFullTimeCell");
        expect(CurrentFullTimeCell).toHaveLength(1);
    };

    const assertCurrentRealTimeCellDoesNotExist = () => {
        const CurrentRealTimeCell = queryAllByTestId("CurrentRealTimeCell");
        expect(CurrentRealTimeCell).toHaveLength(0);
    };
    const assertCurrentRealTimeCellExists = () => {
        const CurrentRealTimeCell = queryAllByTestId("CurrentRealTimeCell");
        expect(CurrentRealTimeCell).toHaveLength(1);
    };

    return {
        assertFullTimeCellDoesNotExist,
        assertFullTimeCellExists,
        assertCurrentFullTimeCellDoesNotExist,
        assertCurrentFullTimeCellExists,
        assertRealTimeCellDoesNotExist,
        assertRealTimeCellExists,
        assertCurrentRealTimeCellDoesNotExist,
        assertCurrentRealTimeCellExists
    };
}

describe("DayRow Component", () => {
    it("should not render CurrentWorkTimeCell subcomponents", () => {
        const fullTime = "10:03",
            realTime = "10:00";

        rootSelectors.isStarted.mockReturnValue(false);
        const props = getProps({
            fullTime,
            realTime,
        });
        const testableDayRow = new TestableDayRow(props);
        testableDayRow.assertCurrentFullTimeCellDoesNotExist();
        testableDayRow.assertCurrentRealTimeCellDoesNotExist();
        testableDayRow.assertFullTimeCellExists();
        testableDayRow.assertRealTimeCellExists();
    });

    it("should render CurrentWorkTimeCell subcomponents", () => {
        const startTime = moment();
        const
            fullTime = "10:03",
            realTime = "10:00";

        rootSelectors.isStarted.mockReturnValue(true);
        rootSelectors.getCurrentDayInfo.mockReturnValue({
            lastFullTime: fullTime,
            lastStartTimestamp: "10:00"
        });
        const props = getProps({
            startTime,
            fullTime,
            realTime
        });

        const testableDayRow = new TestableDayRow(props);
        testableDayRow.assertCurrentFullTimeCellExists();
        testableDayRow.assertCurrentRealTimeCellExists();
        testableDayRow.assertFullTimeCellDoesNotExist();
        testableDayRow.assertRealTimeCellDoesNotExist();
    });
});