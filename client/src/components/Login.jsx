import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ variables: { username, password } });
      console.log('Logged in:', data);
      // handle the login token here (e.g., store it in localStorage)
      // redirect to the appropriate dashboard 
    } catch (error) {
      // Error handling is managed by the `error` variable from useMutation
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {loading && <p>Logging in...</p>}
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
