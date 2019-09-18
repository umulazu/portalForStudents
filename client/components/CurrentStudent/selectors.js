export const isAuthorized = state => state.application.authorized;

export const getNameOfStudent = state => state.authorization.name;

export const getStudentInfo = state => ({
    mentor: state.studentInfo.mentor,
    birthday: state.studentInfo.birthday,
});