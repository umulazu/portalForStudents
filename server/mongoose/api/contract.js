import mongoose from 'mongoose'
import { ContractSchema } from '../schemas'

const Contract = mongoose.model('Contract', ContractSchema, 'contracts')

export const getContractById = (contractId) => {
    return Contract.findOne({ _id: contractId }).exec()
};

export const getActiveContractByStudent = (studentId) => {
    const id = mongoose.Types.ObjectId(studentId);
    return Contract.findOne({ studentId: id, status: 'Active' }).exec()
};

export const addContract = (newContract) => {
    return Contract.create(newContract)
};

export const updateContract = (contractId, contractNewState) => {
    return Contract.updateOne({ _id: contractId }, {
        $set: {
            ...contractNewState
        }
    }).exec()
};

export const deleteContract = (contractId) => {
    return Contract.findByIdAndRemove(contractId).exec();
};

export const addWorkday = (contractId, workday) => {
    return Contract.updateOne({ _id: contractId }, {
        $push:  {workdays: workday}
    }).exec();
};

export const updateWorkday = (contractId, workdayId, workday) => {
    return Contract.updateOne({_id: contractId, 'workdays._id': workdayId}, {$set: {'workdays.$': workday}}).exec();
};

export const getWorkday = (contractId, workdayId) => {
    return Contract.findOne({_id: contractId, workdays: {$elemMatch: {_id: mongoose.Types.ObjectId(workdayId)}}}).exec()
        .then((contract) => { })
};

export const addTime = (contractId, workdayId, time) => {
    const diff = 5;
    //getWorkday(contractId, workdayId)
        //.then((workday) => {
            return Contract.updateOne({_id: contractId, 'workdays._id': workdayId}, {$set: {"workdays.$.timeWorked": diff}, $push: {"workdays.$.time": time}}).exec()
        //});
};