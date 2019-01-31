import { buildSchema } from 'graphql'

const schema = buildSchema(`    
  input StudentInput {
    id: String!,
    username: String!,    
    password: String,
  }
  input ContractInput {
    id: String!,
    number: String!,
    status: String!,
    startingDay: Date!,
    endingDay: Date!,
    hoursPerWeek: Number!,
    workdays: [WorkdayInput],
    studentId: ID!,
  }
  input WorkdayInput {
    id: String!,
    date: Date!,
    time: [TimeInput],
    timeWorked: Number,
  }
  input TimeInput {
    startingTime: String!,
    endingTime: String!,
  }
  type Student {
    id: ID!,
    username: String!,
    password: String!,
  }
  type Contract {
    id: ID!,
    number: String!,  
    status: String,
    startingDay: Date!,
    endingDay: Date!,
    hoursPerWeek: Number!,
    workdays: [Workday],
    studentId: ID!,
  }
  type Workday {
    id: ID!,
    date: Date!,
    time: [Time],
    timeWorked: Number,
  }
  type Time {
    startingTime: String!,
    endingTime: String!,
  }
  type Query {
    student(id: String!): Student,
    contract(id: String!): Contract,
    activeContract(studentId: String!): Contract,
    workday(contractId: String!, workdayId: String!): Workday,
  }
  type Mutation {
    addStudent(student: StudentInput!): String
    deleteStudent(studentId: ID!): Boolean 
    addContract(contract: ContractInput!): String
    deleteContract(contractId: ID!): Boolean    
    updateContract(contract: ContractInput!): Boolean    
    addWorkday(contractId: String!, workday: WorkdayInput!): String
    updateWorkday(contractId: String!, workdayId: String!, workday: WorkdayInput!): Boolean
    addTime(contractId: String!, workdayId: String!, time: TimeInput!): Number
  }
`)

export default schema
