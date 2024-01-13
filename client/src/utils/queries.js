import { gql } from "@apollo/client";

export const GET_CHORES = gql`
  query getChores {
    chores {
      id
      chore_name
      amount
      isCompleted
      userId
    }
  }
`;

export const GET_MY_CHORES = gql`
  query getUserChores($userId: String!) {
    userChores(userId: $userId) {
      id
      chore_name
      amount
      isCompleted
      userId
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
