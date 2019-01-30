import mongoose from 'mongoose'
import { WorkdaySchema } from '../schemas'

const Workday = mongoose.model('Workday', WorkdaySchema, 'workdays')

export const getWorkdayById = (workdayId) => {
    return Workday.findOne({ _id: workdayId }).exec()
}

export const getWorkdayByDateAndContract = (date, numberOfContract) => {
    return Workday.findOne({ date: date, numberOfContract: numberOfContract }).exec()
}

export const addWorkday = (newWorkday) => {
    return Workday.create(newWorkday)
}

export const addTime = (workdayId, time) => {
    const id = mongoose.Types.ObjectId();
    time._id = id;
    return Workday.findByIdAndUpdate(workdayId, {$push: {time: time}}).exec()
}

export const deleteWorkday = (workdayId) => {
    return Workday.findByIdAndRemove(workdayId).exec()
}