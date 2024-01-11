import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        id
      }
    }
  }
`;

export const CREATE_CHILD_ACCOUNT = gql`
  mutation CreateChildAccount($username: String!, $password: String!) {
    CreateChildAccount(username: $username, password: $password) {
      id
      username
    }
  }
`;


export const UPDATE_CHORE = gql`
  mutation updateChore(
    $id: ID!
    $date_approved: String
    $date_completed: String
    $parent_comments: String
    $child_comments: String
  ) {
    updateChore(
      id: $id
      date_approved: $date_approved
      date_completed: $date_completed
      parent_comments: $parent_comments
      child_comments: $child_comments
    ) {
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


export const SAVE_CHORE = gql`
mutation saveChore($chore_name: String!, $amount: Float!, $parent_username: String!) {
  saveChore(chore_name: $chore_name, amount: $amount, parent_username: $parent_username) {
    id
    chore_name
    amount
    parent_id
  }
}



`;


export const DELETE_CHORE = gql`
  mutation deleteChore($choreId: ID!) {
    deleteChore(choreId: $choreId) {
      id
      username
      email
      savedChores {
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

