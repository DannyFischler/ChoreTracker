import React, { useState } from 'react';
import axios from 'axios';

function ParentRegistration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('username', username, 'password', password);
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        username: username,
        password: password
      });
      console.log(response.data);
      // Redirect to login or dashboard here
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
