import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const StudentSchema = new Schema({
    username: {
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
            required: true
        },
        time: [{
            startingTime: String,
            endingTime: String,
        }],
        timeWorked: Number
    }],
    studentId:{
        type: ObjectId,
        required: true,
    },
});