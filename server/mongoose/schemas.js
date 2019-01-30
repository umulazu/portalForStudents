import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const StudentSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String
})

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
    }
})

export const WorkdaySchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    time: [{
        startingTime: String,
        endingTime: String,
    }],
    numberOfContract: {
        type: String,
        required: true
    }
})