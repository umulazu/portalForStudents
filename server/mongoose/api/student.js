import mongoose from 'mongoose'
import { StudentSchema } from '../schemas'
import passportLocalMongoose from 'passport-local-mongoose'

StudentSchema.plugin(passportLocalMongoose)
export const Student = mongoose.model('Student', StudentSchema, 'students')

export const getStudentById = (studentId) => {
    return Student.findOne({ _id: studentId }).exec();
};

export const getStudentByEmail = (email) => {
    return Student.findOne({ email: email }).exec();
};

export const updateStudent = (studentId, username) => {
    return Student.updateOne({_id: studentId}, {$set: {"username": username}}).exec();
};

export const addStudent = (newStudent) => {
    return Student.create(newStudent)
        .then(student => {
            return student._id.toString();
        });
};

export const deleteStudent = (studentId) => {
    return Student.findByIdAndRemove(studentId).exec();
};