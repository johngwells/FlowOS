import { gql } from 'apollo-server-micro';
import { buildSchema } from 'graphql';

export const typeDefs = gql`
  type Fields {
    id: ID
    title: String!
    reporter: String!
  }

  type Query {
    fields: [Fields]!
  }

  input FieldsInput {
    title: String!
    reporter: String!
    severity: [String]
    status: [String]
    devAssigned: String 
  }

  type Mutation {
    createFields(title: String!, reporter: String!): Fields!
  }
`