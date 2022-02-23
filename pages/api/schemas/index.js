import { gql } from 'apollo-server-micro';
import Void from '../../../lib/scalar-void';

export const typeDefs = gql`
  type Fields {
    id: ID!
    title: String!
    reporter: String!
    severity: String!
    status: String!
  }

  scalar Void

  type Query {
    fields: [Fields]!
  }

  input FieldsInput {
    title: String!
    reporter: String!
    severity: String!
    status: String!
  }

  input UpdateInput {
    status: String!
  }

  type Mutation {
    createFields(input: FieldsInput!): Fields!
    deleteField(id: ID!): Void
    updateField(id: ID!, input: UpdateInput): Fields!
  }
`;
