import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Link {
    id: ID
    title: String
    reporter: String
    severity: [String]
    status: [String]
    devAssigned: String
  }

  type Query {
    links: [Link]!
  }
`;
