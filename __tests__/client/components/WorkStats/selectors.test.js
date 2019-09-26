import { getWorkStats, staticDataHandler } from "../../../../client/components/WorkStats/selectors";
import moment from "moment";
import * as utilities from "../../../../client/components/WorkStats/utilities";

describe("getWorkStats selector", () => {
    it("should return workweeks from workdays", () => {
        const normOfMonth = 126;
        const workdays = [
            {
                finishTime: "2019-07-02T20:27:50.803Z",
                fullTime: "10:03",
                nameOfTheDay: "Вторник",
                numberOfTheDay: 2,
                numberOfTheWeek: 1,
                realTime: "10:00",
                startTime: "2019-07-02T20:24:46.168Z",
                timestamps: [
                    {
                        startTime: "13:24",
                        finishTime: "23:27",
                    },
                ],
                _id: "red2019July2",
            },
            {
                finishTime: "2019-07-03T18:20:50.803Z",
                fullTime: "8:00",
                nameOfTheDay: "Среда",
                numberOfTheDay: 3,
                numberOfTheWeek: 1,
                realTime: "8:00",
                startTime: "2019-07-03T10:24:46.168Z",
                timestamps: [
                    {
                        startTime: "13:24",
                        finishTime: "21:27",
                    },
                ],
                _id: "red2019July3",
            }
        ];

        const result = getWorkStats.resultFunc(workdays, {normOfMonth});

        const expectedResult = {
            realTimeMinutes: 18 * 60,
            restOfTimeMinutes: normOfMonth * 60 - 18 * 60
        };

        expect(result).toStrictEqual(expectedResult);
    });
});

describe("staticDataHandler auxiliary function", () => {
    it("should return count of weekdays of period and norm of month", () => {
        const firstWorkdayOfMonth = moment("2019-11-01");
        const specialDays = {
            holidays: [],
            postponedDays: []
        };
        const hourPerDay = 4;

        jest.spyOn(utilities, "getCountOfLabourDays").mockImplementationOnce(() => {
            return 21;
        }).mockImplementationOnce(() => {
            return 15;
        });

        const expectedNormOfMonth = 84;
        const expectedCountOfRestLabourDays = 15;

        const {
            normOfMonth,
            countOfRestLabourDays,
        } = staticDataHandler(firstWorkdayOfMonth, specialDays, hourPerDay);

        expect(normOfMonth).toBe(expectedNormOfMonth);
        expect(countOfRestLabourDays).toBe(expectedCountOfRestLabourDays);
    });
});