import mongoose from 'mongoose'
import { StudentSchema } from '../schemas'
import passportLocalMongoose from 'passport-local-mongoose'

StudentSchema.plugin(passportLocalMongoose)
export const Student = mongoose.model('Student', StudentSchema, 'students')

export const getStudentById = (studentId) => {
    return Student.findOne({ _id: studentId }).exec()
}

export const addStudent = (newStudent) => {
    return Student.create(newStudent)
}

export const deleteStudent = (studentId) => {
    return Candidate.findByIdAndRemove(studentId).exec()
}