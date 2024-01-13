import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import backgroundImage from "../assets/background5.jpeg";
import Auth from "../utils/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ variables: { username, password } });
      console.log("Logged in:", response);
      // handle the login token here (e.g., store it in localStorage)
      Auth.login(response.data.login.token);
      console.log("Profile:", Auth.getProfile());
      // redirect to the appropriate dashboard
    } catch (error) {
      // Error handling is managed by the `error` variable from useMutation
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "1440px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white" }}>Login</h2>
      {loading && <p>Logging in...</p>}
      {error && <p>Error: {error.message}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
