import mongoose from "mongoose";
import { WorkdaysSchema } from "../schemas";
import moment from "moment";
import { Student } from "./student";
import daysOfWeek from "../../../constants/daysOfWeek";

const Workday = mongoose.model("Workday", WorkdaysSchema, "workdays");

export const addStartTime = studentId => {
    return (async () => {
        // now in UTC
        const now = moment();
        const workdayId = `${studentId}${now.format("YYYYMMMMD")}`;
        try {
            const currentDay = await Workday.findOneAndUpdate(
                { _id: workdayId, student: studentId },
                { $set: { _id: workdayId }, $push: { times: { startTime: now } } },
                { upsert: true, new: true, lean: true }
            );
            if (currentDay) {
                await Student.updateOne(
                    { _id: studentId },
                    { $addToSet: { workdays: { _id: workdayId } } }
                );
                return dayModification(currentDay);
            }
        } catch (error) {
            throw error;
        }
    })();
};

export const addFinishTime = studentId => {
    return (async () => {
        // now in UTC
        const now = moment();
        const workdayId = `${studentId}${now.format("YYYYMMMMD")}`;
        try {
            const currentDay = await Workday.findOne(
                { _id: workdayId },
                { times: { $slice: -1 }, __v: 0, student: 0 }
            );
            if (currentDay && currentDay.times[0]) {
                const startTime = currentDay.times[0].startTime;
                const newCurrentDay = await Workday.findOneAndUpdate(
                    { _id: workdayId, "times.startTime": startTime },
                    { $set: { "times.$.finishTime": now } },
                    { new: true, lean: true }
                );
                return dayModification(newCurrentDay);
            }
        } catch (error) {
            throw error;
        }
    })();
};

export const getWorkdaysForMonth = studentId => {
    return (async () => {
        const now = moment();
        const pattern = `^${studentId}${now.format("YYYYMMMM")}`;
        const workdays = await Workday.find(
            { _id: { $regex: pattern } },
            { times: 1 }
        );

        const modifiedWorkdays = workdays.map(day => {
            const lastIndex = day.times.length - 1;
            const currentDateStartTime = moment(day.times[0].startTime);
            const fullTime = day.times.reduce((accumulator, currentValue) => {
                if (currentValue.finishTime && currentValue.startTime) {
                    const difference = moment
                        .utc(moment(currentValue.finishTime))
                        .diff(moment(currentValue.startTime));
                    return accumulator.add(difference);
                } else {
                    return accumulator;
                }
            }, moment.utc(0));

            return {
                _id: day._id,
                numberOfTheWeek:
                    currentDateStartTime.week() -
                    moment(currentDateStartTime)
                        .startOf("month")
                        .week() +
                    1,
                nameOfTheDay: daysOfWeek[currentDateStartTime.day()],
                numberOfTheDay: currentDateStartTime.date(),
                startTime: currentDateStartTime.format("H:mm"),
                finishTime:
                    day.times[lastIndex].finishTime &&
                    moment(day.times[lastIndex].finishTime).format("H:mm"),
                fullTime: fullTime.format("H:mm"),
                realTime: moment
                    .utc(fullTime.subtract(fullTime.minutes() % 15, "minutes"))
                    .format("H:mm"),
            };
        });

        modifiedWorkdays.sort((workday1, workday2) => {
            return workday1.numberOfTheDay - workday2.numberOfTheDay;
        });

        return modifiedWorkdays;
    })();
};

export const getWorkdaysForMonthWithTimestamps = studentId => {
    return (async () => {
        const now = moment();
        const pattern = `^${studentId}${now.format("YYYYMMMM")}`;
        const workdays = await Workday.find(
            { _id: { $regex: pattern } },
            { times: 1 }
        );
        const modifiedWorkdays = workdays.map(day => dayModification(day));
        modifiedWorkdays.sort((workday1, workday2) => {
            return workday1.numberOfTheDay - workday2.numberOfTheDay;
        });

        return modifiedWorkdays;
    })();
};

const dayModification = (day) => {
    const lastIndex = day.times.length - 1;
    const currentDateStartTime = moment(day.times[0].startTime);
    const fullTime = day.times.reduce((accumulator, currentValue) => {
        if (currentValue.finishTime && currentValue.startTime) {
            const difference = moment
                .utc(moment(currentValue.finishTime))
                .diff(moment(currentValue.startTime));
            return accumulator.add(difference);
        } else {
            return accumulator;
        }
    }, moment.utc(0));

    const timestamps = day.times.map(currentValue => {
        return {
            startTime: moment(currentValue.startTime).format("H:mm"),
            finishTime:
                currentValue.finishTime &&
                moment(currentValue.finishTime).format("H:mm"),
        };
    });

    return {
        _id: day._id,
        numberOfTheWeek:
            currentDateStartTime.week() -
            moment(currentDateStartTime)
                .startOf("month")
                .week() +
            1,
        nameOfTheDay: daysOfWeek[currentDateStartTime.day()],
        numberOfTheDay: currentDateStartTime.date(),

        timestamps: timestamps,
        startTime: currentDateStartTime,
        finishTime:
            day.times[lastIndex].finishTime &&
            moment(day.times[lastIndex].finishTime),

        fullTime: fullTime.format("H:mm"),
        realTime: moment
            .utc(fullTime.subtract(fullTime.minutes() % 15, "minutes"))
            .format("H:mm"),
    };
};