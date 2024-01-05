import { gql } from '@apollo/client';

export const login = async (username, password) => {
  
  const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { username, password },
    });

    const { token } = response.data.login;
    if (token) {
      localStorage.setItem('user', JSON.stringify({ token }));
    }
    return { token };
  } catch (error) {
    console.error('Login error', error);
  }
};
