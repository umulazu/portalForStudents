import mongoose from 'mongoose'
import { ContractSchema } from '../schemas'

const Contract = mongoose.model('Contract', ContractSchema, 'contracts')

export const getContractById = (contractId) => {
    return Contract.findOne({ _id: contractId }).exec()
}

export const getActiveContractByStudent = (studentId) => {
    return Contract.findOne({ student: studentId, status: 'Active' }).exec()
}

export const addContract = (newContract) => {
    return Contract.create(newContract)
}

export const updateContract = (contractId, contractNewState) => {
    delete contractNewState.id
    return Contract.updateOne({ _id: contractId }, {
        '$set': {
            ...contractNewState
        }
    })
}

export const deleteContract = (contractId) => {
    return Contract.findByIdAndRemove(contractId).exec()
}