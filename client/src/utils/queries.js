import { gql } from '@apollo/client';

export const GET_CHORES = gql`
  query getChores {
    chores {
      _id
      choreId
      parent_id
      chore_name
      amount
      date_approved
      date_completed
      parent_comments
      child_comments
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedChores {
        choreId
        parent_id
        chore_name
        amount
        date_approved
        date_completed
        parent_comments
        child_comments
      }
    }
  }
`;

