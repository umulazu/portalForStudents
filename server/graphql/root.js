import { getStudentById, addStudent, deleteStudent } from '../mongoose/api/student'
import {
    getContractById,
    getActiveContractByStudent,
    addContract,
    updateContract,
    deleteContract,
    addWorkday,
    updateWorkday,
    getWorkday,
    addTime
} from '../mongoose/api/contract'

const root = {
    student: ({id}) => {
        return getStudentById(id);
    },

    contract: ({id}) => {
        return getContractById(id);
    },

    activeContract: ({studentId}) => {
        return getActiveContractByStudent(studentId);
    },

    workday: ({contractId, workdayId}) => {
        return getWorkday(contractId, workdayId);
    },

    addStudent: ({ student }) => {
        return addStudent(student);
    },

    deleteStudent: ({studentId}) =>{
        return deleteStudent(studentId)
            .then(result => !!result);
    },

    addContract:({contract}) => {
        return addContract(contract);
    },

    deleteContract:({contractId}) => {
        return deleteContract(contractId)
            .then(result => !!result);
    },

    updateContract:({contract}) => {
        return updateContract(contract)
            .then(result => !!result);
    },

    addWorkday:({contractId, workday}) => {
        return addWorkday(contractId, workday);
    },

    updateWorkday:({contractId, workdayId, workday}) => {
        return updateWorkday(contractId, workdayId, workday)
            .then(result => !!result);
    },

    addTime:({contractId, workdayId, time}) => {
        return addTime(contractId, workdayId, time);
    },
};

export default root