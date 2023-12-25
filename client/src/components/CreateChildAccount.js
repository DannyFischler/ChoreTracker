// src/components/CreateChildAccount.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateChildAccount() {
  const [childUsername, setChildUsername] = useState('');
  const [childPassword, setChildPassword] = useState('');
  // Assume parent's token is stored and accessed here
  const token = 'parent-auth-token';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/createChild', {
        username: childUsername,
        password: childPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
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
