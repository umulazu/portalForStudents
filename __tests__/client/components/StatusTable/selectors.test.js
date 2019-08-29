import { getWorkweeks, workdaysModifier } from "../../../../client/components/StatusTable/selectors";

describe("getWorkweeks selector", () => {
    it("should return workweeks from workdays", () => {
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

        const state = {
            workdaysContainer: {
                workdays
            }
        };
        const result = getWorkweeks(state);

        const expectedWorkweeks = [
            {
                numberOfTheWeek: 1,
                daysOfTheWeek: [...workdays],
            }
        ];

        expect(result).toStrictEqual(expectedWorkweeks);
    });

    it("should fill workweeks with empty weeks if work started after month's first week", () => {
        const workdays = [
            {
                finishTime: "2019-07-20T22:27:50.803Z",
                fullTime: "10:03",
                nameOfTheDay: "Понедельник",
                numberOfTheDay: 22,
                numberOfTheWeek: 4,
                realTime: "10:00",
                startTime: "2019-07-20T22:24:46.168Z",
                timestamps: [
                    {
                        startTime: "13:24",
                        finishTime: "23:27",
                    },
                ],
                _id: "red2019July22",
            },
            {
                finishTime: "2019-07-23T18:20:50.803Z",
                fullTime: "8:00",
                nameOfTheDay: "Вторник",
                numberOfTheDay: 23,
                numberOfTheWeek: 4,
                realTime: "8:00",
                startTime: "2019-07-23T10:24:46.168Z",
                timestamps: [
                    {
                        startTime: "13:24",
                        finishTime: "21:27",
                    },
                ],
                _id: "red2019July23",
            }
        ];

        const state = {
            workdaysContainer: {
                workdays
            }
        };
        const result = getWorkweeks(state);

        const expectedWorkweeks = [
            {
                numberOfTheWeek: 1,
                daysOfTheWeek: [],
            },
            {
                numberOfTheWeek: 2,
                daysOfTheWeek: [],
            },
            {
                numberOfTheWeek: 3,
                daysOfTheWeek: [],
            },
            {
                numberOfTheWeek: 4,
                daysOfTheWeek: [...workdays],
            }
        ];

        expect(result).toStrictEqual(expectedWorkweeks);
    });

    it("should fill workweeks with empty weeks if those weeks were missed", () => {
        const workdays = [
            {
                finishTime: "2019-07-2T22:27:50.803Z",
                fullTime: "10:03",
                nameOfTheDay: "Понедельник",
                numberOfTheDay: 2,
                numberOfTheWeek: 1,
                realTime: "10:00",
                startTime: "2019-07-20T2:24:46.168Z",
                timestamps: [
                    {
                        startTime: "13:24",
                        finishTime: "23:27",
                    },
                ],
                _id: "red2019July2",
            },
            {
                finishTime: "2019-07-23T18:20:50.803Z",
                fullTime: "8:00",
                nameOfTheDay: "Вторник",
                numberOfTheDay: 23,
                numberOfTheWeek: 4,
                realTime: "8:00",
                startTime: "2019-07-23T10:24:46.168Z",
                timestamps: [
                    {
                        startTime: "13:24",
                        finishTime: "21:27",
                    },
                ],
                _id: "red2019July23",
            }
        ];

        const state = {
            workdaysContainer: {
                workdays
            }
        };
        const result = getWorkweeks(state);

        const expectedWorkweeks = [
            {
                numberOfTheWeek: 1,
                daysOfTheWeek: [workdays[0]],
            },
            {
                numberOfTheWeek: 2,
                daysOfTheWeek: [],
            },
            {
                numberOfTheWeek: 3,
                daysOfTheWeek: [],
            },
            {
                numberOfTheWeek: 4,
                daysOfTheWeek: [workdays[1]],
            }
        ];

        expect(result).toStrictEqual(expectedWorkweeks);
    });
});

describe("workdaysModifier auxiliary function", () => {
    it("should add new workweek if it did not existed yet", () => {
        const workday1 = {
                finishTime: "2019-07-09T20:27:50.803Z",
                fullTime: "10:03",
                nameOfTheDay: "Вторник",
                numberOfTheDay: 9,
                numberOfTheWeek: 2,
                realTime: "10:00",
                startTime: "2019-07-09T20:24:46.168Z",
                timestamps: [
                    {
                        startTime: "13:24",
                        finishTime: "23:27",
                    },
                ],
                _id: "red2019July9",
        };
        let workweeks = [];

        const result = workdaysModifier(workweeks, workday1);

        const expectedResult = [
            {
                numberOfTheWeek: 2,
                daysOfTheWeek: [workday1]
            }
        ];

        expect(result).toStrictEqual(expectedResult);
    });

    it("shouldn't add new workweek if it exists already", () => {
        const workday1 = {
                finishTime: "2019-07-03T20:27:50.803Z",
                fullTime: "10:03",
                nameOfTheDay: "Вторник",
                numberOfTheDay: 3,
                numberOfTheWeek: 1,
                realTime: "10:00",
                startTime: "2019-07-03T20:24:46.168Z",
                timestamps: [
                    {
                        startTime: "13:24",
                        finishTime: "23:27",
                    },
                ],
                _id: "red2019July3",
        };
        const existedWorkday = {
            finishTime: "2019-07-02T20:27:50.803Z",
            fullTime: "10:03",
            nameOfTheDay: "Среда",
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
        };
        let workweeks = [
            {
                numberOfTheWeek: 1,
                daysOfTheWeek: [
                    existedWorkday
                ]
            }
        ];

        const result = workdaysModifier(workweeks, workday1);

        const expectedResult = [
            {
                numberOfTheWeek: 1,
                daysOfTheWeek: [
                    existedWorkday,
                    workday1
                ]
            }
        ];

        expect(result).toStrictEqual(expectedResult);
    });

    it("should fill workweeks with empty weeks if those weeks were missed", () => {
        const workday1 = {
                finishTime: "2019-07-23T18:20:50.803Z",
                fullTime: "8:00",
                nameOfTheDay: "Вторник",
                numberOfTheDay: 23,
                numberOfTheWeek: 4,
                realTime: "8:00",
                startTime: "2019-07-23T10:24:46.168Z",
                timestamps: [
                    {
                        startTime: "13:24",
                        finishTime: "21:27",
                    },
                ],
                _id: "red2019July23",
        };
        const existedWorkday = {
            finishTime: "2019-07-2T22:27:50.803Z",
            fullTime: "10:03",
            nameOfTheDay: "Понедельник",
            numberOfTheDay: 2,
            numberOfTheWeek: 1,
            realTime: "10:00",
            startTime: "2019-07-20T2:24:46.168Z",
            timestamps: [
                {
                    startTime: "13:24",
                    finishTime: "23:27",
                },
            ],
            _id: "red2019July2",
        };
        let workweeks = [
            {
                numberOfTheWeek: 1,
                daysOfTheWeek: [existedWorkday]
            }
        ];

        const result = workdaysModifier(workweeks, workday1);

        const expectedResult = [
            ...workweeks,
            {
                numberOfTheWeek: 2,
                daysOfTheWeek: [],
            },
            {
                numberOfTheWeek: 3,
                daysOfTheWeek: [],
            },
            {
                numberOfTheWeek: 4,
                daysOfTheWeek: [workday1]
            }
        ];

        expect(result).toStrictEqual(expectedResult);
    });
});