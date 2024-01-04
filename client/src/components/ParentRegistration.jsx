import React, { useState } from 'react';


function ParentRegistration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/graphql', { // Adjust the URL if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation {
              register(username: "${username}", password: "${password}") {
                id
                username
          
              }
            }
          `
        })
      });
      const data = await response.json();
      console.log(data);
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
