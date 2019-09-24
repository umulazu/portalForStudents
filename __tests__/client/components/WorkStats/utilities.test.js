import moment from "moment";
import {
    accumulateRealTime,
    getCountOfLabourDays,
    staticDataHandler
} from "../../../../client/components/WorkStats/utilities";

// jest.mock("../../../../client/components/WorkStats/utilities");

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

        const sumOf1DayAndEmptyMoment = accumulateRealTime(
            moment.duration(0),
            workday1
        );
        const sumOf2Days = accumulateRealTime(
            sumOf1DayAndEmptyMoment,
            workday2
        );

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

        const sumOf1DayAndEmptyMoment = accumulateRealTime(
            moment.duration(0),
            workday1
        );
        const sumOf2Days = accumulateRealTime(
            sumOf1DayAndEmptyMoment,
            workday2
        );
        const sumOf3Days = accumulateRealTime(sumOf2Days, workday3);

        const expectedResult = moment
            .duration("10:00")
            .add(moment.duration("15:00"));

        expect(sumOf3Days.asMinutes()).toBe(expectedResult.asMinutes());
    });

    it("should return 0 if today is the day", () => {
        const today = moment();

        const workday1 = {
            realTime: "8:00",
            startTime: today.utc().format(),
        };

        const sumOf1DayAndEmptyMoment = accumulateRealTime(
            moment.duration(0),
            workday1
        );

        const expectedResult = moment.duration(0);

        expect(sumOf1DayAndEmptyMoment.asMinutes()).toBe(
            expectedResult.asMinutes()
        );
    });
});

describe("getCountOfLabourDays auxiliary function", () => {
    it("should return count of weekdays of period", () => {
        const firstDayOfPeriod = moment("2019-11-01");
        const lastDayOfPeriod = moment("2019-12-01");
        const specialDays = {
            holidays: [],
            postponedDays: [],
        };

        const expectedResult = 21;

        expect(
            getCountOfLabourDays(firstDayOfPeriod, lastDayOfPeriod, specialDays)
        ).toBe(expectedResult);
    });

    it("should return count of weekdays and postponed days of period", () => {
        const firstDayOfPeriod = moment("2019-11-01");
        const lastDayOfPeriod = moment("2019-12-01");
        const specialDays = {
            holidays: [],
            postponedDays: ["2019-11-09"],
        };

        const expectedResult = 22;

        expect(
            getCountOfLabourDays(firstDayOfPeriod, lastDayOfPeriod, specialDays)
        ).toBe(expectedResult);
    });

    it("should return count of weekdays minus holidays", () => {
        const firstDayOfPeriod = moment("2019-11-01");
        const lastDayOfPeriod = moment("2019-12-01");
        const specialDays = {
            holidays: ["2019-11-04", "2019-11-05"],
            postponedDays: [],
        };

        const expectedResult = 19;

        expect(
            getCountOfLabourDays(firstDayOfPeriod, lastDayOfPeriod, specialDays)
        ).toBe(expectedResult);
    });

    it("should return count of weekdays and postponed days minus holidays", () => {
        const firstDayOfPeriod = moment("2019-11-01");
        const lastDayOfPeriod = moment("2019-12-01");
        const specialDays = {
            holidays: ["2019-11-04", "2019-11-05"],
            postponedDays: ["2019-11-09"],
        };

        const expectedResult = 20;

        expect(
            getCountOfLabourDays(firstDayOfPeriod, lastDayOfPeriod, specialDays)
        ).toBe(expectedResult);
    });
});

// describe("staticDataHandler auxiliary function", () => {
//     it("should return count of weekdays of period", () => {
//         const firstWorkdayOfMonth = moment("2019-11-01");
//         const specialDays = {
//             holidays: [],
//             postponedDays: []
//         };
//         const hourPerDay = 4;
//
//         getCountOfLabourDays.mockReturnValueOnce(21);
//         getCountOfLabourDays.mockReturnValueOnce(15);
//
//         const expectedNormOfMonth = 84;
//         const expectedCountOfRestLabourDays = 15;
//
//         const {
//             resultCountOfRestLabourDays,
//             resultExpectedNormOfMonth
//         } = staticDataHandler(firstWorkdayOfMonth, specialDays, hourPerDay);
//         expect(resultCountOfRestLabourDays).toBe(expectedCountOfRestLabourDays);
//     });
// });