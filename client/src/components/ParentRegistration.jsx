import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation addUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`;

function ParentRegistration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register({ variables: { username, password } });
      // Handle success - redirect or show message
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Parent Registration</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default ParentRegistration;
