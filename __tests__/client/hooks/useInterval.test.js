import { act } from "react-dom/test-utils";
import React, { useCallback, useState } from "react";
import { render } from "@testing-library/react";
import useInterval from "../../../client/hooks/useInterval";

// Fake component that uses the Hook
function TimerComponent({ initialState }) {
    const [currentWorkTimeMinutes, setCurrentWorkTimeMinutes] = useState(initialState);
    const setIntervalHandler = useCallback(() => {
            act(() => {
                setCurrentWorkTimeMinutes(cur => cur + 1);
            });
        },
        [setCurrentWorkTimeMinutes]
    );
    const clearIntervalHandler = useCallback( () => {
            setCurrentWorkTimeMinutes(0);
        },
        [setCurrentWorkTimeMinutes]
    );
    useInterval(setIntervalHandler, clearIntervalHandler);

    return <span>{currentWorkTimeMinutes}</span>
}

it('should increment value every minute by advancing timers', () => {
    jest.useFakeTimers();

    // first render of component
    const initialState = 0;
    const { container } = render(<TimerComponent initialState={initialState}/>);
    const span = container.firstChild;
    const spanValue = +span.textContent;
    console.log(spanValue);
    expect(spanValue).toBe(0);

    // after 1 minute
    jest.advanceTimersByTime(60 * 1000);
    const spanAfter1Minute = container.firstChild;
    const spanAfter1MinuteValue = +spanAfter1Minute.textContent;
    console.log(spanAfter1MinuteValue);
    expect(spanAfter1MinuteValue).toBe(1);

    // after 2 minutes
    jest.advanceTimersByTime(60 * 1000);
    const spanAfter2Minutes = container.firstChild;
    const spanAfter2MinutesValue = +spanAfter2Minutes.textContent;
    console.log(spanAfter2MinutesValue);
    expect(spanAfter2MinutesValue).toBe(2);

    jest.useRealTimers();
});