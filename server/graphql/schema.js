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
  }
  input WorkdayInput {
    id: String!,
    date: Date!,
    time: [TimeInput],
    numberOfContract: String!,
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
  }
  type Workday {
    id: ID!,
    date: Date!,
    time: [TimeInput],
    numberOfContract: String!,
  }
`)

export default schema
