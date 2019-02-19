import mongoose from 'mongoose'
import { ContractSchema } from '../schemas'
import getDiffBetweenTime from '../../utilities/getDiffBetweenTime'
import areEqualDates from '../../utilities/areEqualDates'

export const Contract = mongoose.model('Contract', ContractSchema, 'contracts')

export const getContractById = (contractId) => {
    return Contract.findOne({ _id: contractId }).exec()
};

export const getActiveContractByStudent = (username) => {
    return Contract.findOne({ student: username, status: 'Active' }).exec()
};

export const addContract = (newContract) => {
    return Contract.create(newContract)
        .then(contract => {
            return contract._id.toString();
        });
};

export const updateContract = (contractId, contractNewState) => {
    return Contract.updateOne({ _id: contractId }, {
        $set: {
            ...contractNewState
        }
    }).exec()
        .then(() => {
            return contractId;
        });
};

export const deleteContract = (contractId) => {
    return Contract.findByIdAndRemove(contractId).exec();//
};

export const addWorkday = (contractId, date) => {
    const workday = {
        date: date,
        time: [],
        timeWorked: 0
    };
    return Contract.updateOne({ _id: contractId }, {
        $push:  {workdays: workday}
    }).exec()
        .then(() => {
            return id.toString();
        });
};

export const updateWorkday = (contractId, workdayId, workday) => {
    return Contract.updateOne({_id: contractId, 'workdays._id': workdayId}, {$set: {'workdays.$': workday}}).exec()
        .then(() => {
            return workdayId;
        });
};

export const getWorkdayIdByDate = (contractId, date) => {
    return Contract.findOne({_id: contractId}).exec()
        .then((contract) => {
            const workdays = contract.workdays.filter((workday) => areEqualDates(workday.date, date));
            if(workdays.length === 0)
                return null;
            return workdays[0]._id.toString();
        })
};

export const getWorkdayById = (contractId, workdayId) => {
    return Contract.findOne({_id: contractId}).exec()
        .then((contract) => {
            const workdays = contract.workdays.filter((workday) => workday._id.toString() === workdayId);
            if(workdays.length === 0)
                return null;
            return workdays[0];
        })
};



export const addTime = (contractId, workdayId, time) => {
    const diff = getDiffBetweenTime(time);
    getWorkdayById(contractId, workdayId)
        .then((workday) => {
            return Contract.updateOne({_id: contractId, 'workdays._id': workdayId}, {$set: {"workdays.$.timeWorked": diff + workday.timeWorked}, $push: {"workdays.$.time": time}}).exec()
                .then(() =>{
                    return diff;
                });
        });
};

