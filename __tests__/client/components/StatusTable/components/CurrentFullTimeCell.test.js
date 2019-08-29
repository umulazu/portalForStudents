import React from "react";
import { Provider } from "react-redux";
import { render, configure } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { act } from "react-dom/test-utils";

import CurrentFullTimeCell from "../../../../../client/components/StatusTable/components/CurrentFullTimeCell";
import classNames from "../../../../../client/components/StatusTable/components/scss/DayRow.module.scss";
import * as rootSelectors from "../../../../../client/rootSelectors";

jest.mock("../../../../../client/components/StatusTable/selectors");
jest.mock("../../../../../client/rootSelectors");
const middlewares = [];
const mockStore = configureMockStore(middlewares);

configure({ testIdAttribute: "data-test-component" });

it("should render", () => {
    jest.useFakeTimers();

    const initialState = {};
    const store = mockStore(initialState);
    const className=classNames["day-row__cell"];
    const props = {
        className
    };

    const fullTime = "10:00";
    rootSelectors.getCurrentDayInfo.mockReturnValue({
        lastFullTime: fullTime,
        lastStartTimestamp: null
    });
    const tr = document.createElement("tr");
    const { container, debug, getByTestId, queryAllByTestId } = render(
        <Provider store={store}>
            <CurrentFullTimeCell {...props} />
        </Provider>,
        {
            container: document.body.appendChild(tr),
        });

    const currentMinutes = container.firstChild.textContent;
    expect(currentMinutes).toBe(fullTime);
    act(() => {
        jest.advanceTimersByTime(60 * 1000);
    });
    const currentMinutesAfter1Minute = container.firstChild.textContent;
    const fullTimeAfter1Minute = "10:01";
    expect(currentMinutesAfter1Minute).toBe(fullTimeAfter1Minute);

    jest.useRealTimers();
});


