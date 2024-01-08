import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
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

export const SAVE_CHORE = gql`
  mutation saveChore($choreData: ChoreInput!) {
    saveChore(choreData: $choreData) {
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

export const DELETE_CHORE = gql`
  mutation removeChore($choreId: ID!) {
    removeChore(choreId: $choreId) {
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

export const ADD_CHORE = gql`
  mutation addChore($parent_id: ID!, $chore_name: String!, $amount: Float!) {
    addChore(parent_id: $parent_id, chore_name: $chore_name, amount: $amount) {
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
