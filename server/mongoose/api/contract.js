import mongoose from 'mongoose'
import { ContractSchema } from '../schemas'
import getDiffBetweenTime from '../../utilities/getDiffBetweenTime'

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
    return Contract.findOne({_id: contractId}).exec()
        .then((contract) => {
            return contract.workdays.filter((workday) => workday._id.toString() === workdayId)[0];
        })
};

export const addTime = (contractId, workdayId, time) => {
    const diff = getDiffBetweenTime(time);
    getWorkday(contractId, workdayId)
        .then((workday) => {
            console.log(workday);
            return Contract.updateOne({_id: contractId, 'workdays._id': workdayId}, {$set: {"workdays.$.timeWorked": workday.timeWorked + diff}, $push: {"workdays.$.time": time}}).exec()
        });
};

