import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_CHILD_ACCOUNT_MUTATION = gql`
  mutation CreateChildAccount($username: String!, $password: String!, $token: String!) {
    createChildAccount(username: $username, password: $password, token: $token) {
      id
      username
    }
  }
`;

function CreateChildAccount() {
  const [childUsername, setChildUsername] = useState('');
  const [childPassword, setChildPassword] = useState('');
  const token = 'parent-auth-token'; 

  const [createChildAccount, { data, loading, error }] = useMutation(CREATE_CHILD_ACCOUNT_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createChildAccount({ 
        variables: { 
          username: childUsername, 
          password: childPassword,
          token: token
        }
      });
      // Redirect or update UI here
    } catch (error) {
      console.error('Child account creation failed:', error);
    }
  };
  
  return (
    <div>
      <h2>Create Child Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={childUsername}
          onChange={(e) => setChildUsername(e.target.value)}
          placeholder="Child's Username"
          required
        />
        <input 
          type="password"
          value={childPassword}
          onChange={(e) => setChildPassword(e.target.value)}
          placeholder="Child's Password"
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateChildAccount;
