import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        parentId
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String
    $password: String!
    $parentId: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      parentId: $parentId
    ) {
      token
      user {
        id
        username
        parentId
      }
    }
  }
`;

export const UPDATE_CHORE = gql`
  mutation UpdateChore($id: ID!, $isCompleted: Boolean!) {
    updateChore(id: $id, isCompleted: $isCompleted) {
      id
      chore_name
      isCompleted
    }
  }
`;

export const SAVE_CHORE = gql`
  mutation saveChore($chore_name: String!, $amount: Float!) {
    saveChore(chore_name: $chore_name, amount: $amount) {
      savedChores {
        id
        chore_name
        amount
      }
    }
  }
`;

export const DELETE_CHORE = gql`
  mutation deleteChore($id: ID!) {
    deleteChore(id: $id) {
      id
    }
  }
`;
