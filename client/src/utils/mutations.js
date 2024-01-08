import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const CREATE_CHILD_ACCOUNT = gql`
  mutation CreateChildAccount($username: String!, $password: String!, $token: String!) {
    createChildAccount(username: $username, password: $password, token: $token) {
      id
      username
    }
  }
`;


export const SAVE_CHORE = gql`
  mutation saveChore($choreData: ChoreInput!) {
    saveChore(choreData: $choreData) {
      id
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

export const REMOVE_CHORE = gql`
  mutation removeChore($choreId: ID!) {
    removeChore(choreId: $choreId) {
      id
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
