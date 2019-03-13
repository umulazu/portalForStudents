import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const StudentSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String
});

export const ContractSchema = new Schema({
    number: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    startingDay: {
        type: Date,
        required: true
    },
    endingDay: {
        type: Date,
        required: true
    },
    hoursPerWeek: {
        type: Number,
        required: true
    },
    workdays: [{
        date: {
            type: Date,
            unique: true,
            required: true
        },
        time: [{
            startingTime: String,
            endingTime: String,
        }],
        timeWorked: Number
    }],
    student:{
        type: String,
        required: true,
    },
});