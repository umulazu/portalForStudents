import { createSelector } from "reselect";
import { getWorkdays } from "../../rootSelectors";

export const getWorkweeks = createSelector(
    [getWorkdays],
    workdays => {
        let workweeks = [];
        if (workdays.length) {
            let currentNumberOfTheWeek = workdays[0].numberOfTheWeek;
            // weeks before first workweek
            for (let i = 0; i < currentNumberOfTheWeek - 1; i++) {
                workweeks.push({
                    numberOfTheWeek: i + 1,
                    daysOfTheWeek: [],
                });
            }

            workweeks = workdays.reduce(workdaysModifier, workweeks);
        }
        return workweeks;
    }
);

export const workdaysModifier = (prev, curr) => {
    let workweek = prev.find(
        workday => workday.numberOfTheWeek === curr.numberOfTheWeek
    );
    if (!workweek) {
        // week's interval when one hasn't worked
        let diffWeeks = [];
        if (prev.length) {
            const lastWorkWeek = prev[prev.length - 1]
                ? prev[prev.length - 1].numberOfTheWeek
                : 1;
            const currentNumberOfTheWeek = curr.numberOfTheWeek;
            for (let i = lastWorkWeek; i < currentNumberOfTheWeek - 1; i++) {
                diffWeeks.push({
                    numberOfTheWeek: i + 1,
                    daysOfTheWeek: [],
                });
            }
        }

        return [
            ...prev,
            ...diffWeeks,
            {
                numberOfTheWeek: curr.numberOfTheWeek,
                daysOfTheWeek: [curr],
            },
        ];
    } else {
        workweek.daysOfTheWeek.push(curr);
        return [...prev];
    }
};