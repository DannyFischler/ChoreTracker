import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function CreateChildAccount() {
  const parent = Auth.getProfile();
  const [username, setChildUsername] = useState("");
  const [password, setChildPassword] = useState("");
  const parentId = Auth.getProfile().userId;
  const [register, { data, loading, error }] = useMutation(ADD_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        data: {
          addUser: { user },
        },
      } = await register({
        variables: { username, password, parentId },
      });
      const userId = user.id;
      console.log("Registration successful. User ID:", userId);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <h2>Create Child Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setChildUsername(e.target.value)}
          placeholder="Child's Username"
          required
        />
        <input
          type="password"
          value={password}
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
