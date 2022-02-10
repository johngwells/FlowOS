import { gql } from '@apollo/client'

export const GET_ALL_QUERIES = gql`
  query Query {
    fields {
      id
      title
      reporter
      severity
      status
    }
  }
`;

export const CREATE_BUG = gql`
  mutation Mutation($input: FieldsInput!) {
    createFields(input: $input) {
      title
      reporter
      severity
      status
    }
  }
`;

export const READ_BUG = gql`
  query Query {
    fields {
      id
      title
      reporter
      severity
      status
    }
  }
`;
