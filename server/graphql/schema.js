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
`)

export default schema
