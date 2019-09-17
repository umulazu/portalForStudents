import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const StudentSchema = new Schema({
    _id: String,
    name: String,
    mentor: String,
    password: String,

    workdays: [
        {
            type: String,
            ref: "Workday",
        },
    ],
    contracts: [
        {
            type: String,
            ref: "Contract",
        },
    ],
});

export const ContractSchema = new Schema({
    _id: String,
    status: {
        type: String,
        required: true,
    },
    startingDay: {
        type: Date,
        required: true,
    },
    endingDay: {
        type: Date,
        required: true,
    },
    hoursPerWeek: {
        type: Number,
        required: true,
    },
    mentor : String,
    task: String,

    student: {
        type: String,
        ref: "Student",
    },
});

export const WorkdaysSchema = new Schema({
    _id: String,
    times: [
        {
            startTime: Date,
            finishTime: Date,
        },
    ],

    student: {
        type: String,
        ref: "Student",
    },
});

export const HolidaySchema = new Schema({
    _id: String,
});

export const PostponedDaySchema = new Schema({
    _id: String,
});
