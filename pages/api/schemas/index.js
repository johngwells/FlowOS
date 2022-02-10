import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Fields {
    id: ID
    title: String!
    reporter: String!
    severity: String!
    status: String!
  }

  type Query {
    fields: [Fields]!
  }

  input FieldsInput {
    title: String!
    reporter: String!
    severity: String!
    status: String!
  }

  type Mutation {
    createFields(input: FieldsInput!): Fields
  }
`