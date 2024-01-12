import { gql } from '@apollo/client';


export const GET_CHORES = gql`
  query getChores {
    chores {
      id
      chore_name
      amount
      isCompleted
    }
  }
`;


export const QUERY_ME = gql`
  {
    me {
      id
      chores {
        chore_name
        amount
        isCompleted
      }
    }
  }
`;

