import moment from "moment";
import { accumulateRealTime, getWorkStats } from "../../../../client/components/WorkStats/utulities";

describe("getWorkStats selector", () => {
    it("should return modified data", () => {
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

        const result = getWorkStats(workdays, normOfMonth);

        const expectedResult = {
            realTimeMinutes: 18 * 60,
            restOfTimeMinutes: normOfMonth * 60 - 18 * 60
        };

        expect(result).toStrictEqual(expectedResult);
    });
});

describe("accumulateRealTime auxiliary function", () => {
    it("should return real time of yesterday ", () => {
        const today = moment();
        const yesterday = moment().subtract(1, "days");

        const workday1 = {
            realTime: "8:00",
            startTime: today.utc().format(),
        };
        const workday2 = {
            realTime: "10:00",
            startTime: yesterday.utc().format(),
        };

        const sumOf1DayAndEmptyMoment = accumulateRealTime(moment.duration(0), workday1);
        const sumOf2Days = accumulateRealTime(sumOf1DayAndEmptyMoment, workday2);

        const expectedResult = moment.duration("10:00");

        expect(sumOf2Days.asMinutes()).toBe(expectedResult.asMinutes());
    });

    it("should return sum of real time days except the day", () => {
        const today = moment();
        const yesterday = moment().subtract(1, "days");
        const twoDaysAgo = moment().subtract(2, "days");

        const workday1 = {
            realTime: "8:00",
            startTime: today.utc().format(),
        };
        const workday2 = {
            realTime: "10:00",
            startTime: yesterday.utc().format(),
        };
        const workday3 = {
            realTime: "15:00",
            startTime: twoDaysAgo.utc().format(),
        };

        const sumOf1DayAndEmptyMoment = accumulateRealTime(moment.duration(0), workday1);
        const sumOf2Days = accumulateRealTime(sumOf1DayAndEmptyMoment, workday2);
        const sumOf3Days = accumulateRealTime(sumOf2Days, workday3);

        const expectedResult = moment.duration("10:00").add(moment.duration("15:00"));

        expect(sumOf3Days.asMinutes()).toBe(expectedResult.asMinutes());
    });

    it("should return 0 if today is the day", () => {
        const today = moment();

        const workday1 = {
            realTime: "8:00",
            startTime: today.utc().format(),
        };

        const sumOf1DayAndEmptyMoment = accumulateRealTime(moment.duration(0), workday1);

        const expectedResult = moment.duration(0);

        expect(sumOf1DayAndEmptyMoment.asMinutes()).toBe(expectedResult.asMinutes());
    });
});