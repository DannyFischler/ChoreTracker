import React, { useState } from 'react';

function CreateChildAccount() {
  const [childUsername, setChildUsername] = useState('');
  const [childPassword, setChildPassword] = useState('');
  // Assume parent's token is stored and accessed here
  const token = 'parent-auth-token';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/createChild', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: childUsername,
          password: childPassword
        })
      });
      const data = await response.json();
      console.log(data);
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
