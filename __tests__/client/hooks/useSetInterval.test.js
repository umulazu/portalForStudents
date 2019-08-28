import { renderHook, act } from "@testing-library/react-hooks";
import React from "react";
import { render } from "@testing-library/react";
import useInterval from "../../../client/hooks/useInterval";
import * as selectors from "../../../client/components/StatusTable/selectors";
import moment from "moment";

jest.mock("../../../client/components/StatusTable/selectors");

// Test component that uses the Hook
function TimerComponent({ lastStartTimestamp, isIntervalStarted, countOfMinutes, msMultiplier }) {
    selectors.getLastStartTimestamp.mockResolvedValue(lastStartTimestamp);
    console.log(selectors.getLastStartTimestamp());
    const time = useInterval(isIntervalStarted, countOfMinutes, msMultiplier);

    return <span>{time}</span>
}

test('should count seconds', () => {
    const lastStartTimestamp = "2019-08-15T12:38:41.358Z";
    // selectors.getLastStartTimestamp.mockResolvedValue(lastStartTimestamp);
    const isIntervalStarted = true;
    const countOfMinutes = 1;
    const msMultiplier = 100;
    const lastStartDiffNow =
        moment.duration(moment().format("H:mm")).asMinutes() -
        moment.duration(lastStartTimestamp).asMinutes();

    const { container, rerender } = render(
        <TimerComponent
            lastStartTimestamp={lastStartTimestamp}
            isIntervalStarted={isIntervalStarted}
            countOfMinutes={countOfMinutes}
            msMultiplier={msMultiplier}
        />);
    const span = container.firstChild;
    const spanValue = +span.textContent;
    expect(spanValue).toBe(lastStartDiffNow);


});