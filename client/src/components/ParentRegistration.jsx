import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/mutations";
import backgroundImage from "../assets/background5.jpeg";
import Auth from "../utils/auth";

function ParentRegistration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { data, loading, error }] = useMutation(ADD_USER);
  const [login, { loginData, loginLoading, loginError }] =
    useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        data: {
          addUser: { user },
        },
      } = await register({
        variables: { username, email, password },
      });

      const userId = user.id;
      console.log("Registration successful. User ID:", userId);

      const response = await login({ variables: { username, password } });

      console.log("Logged in:", response);
      Auth.login(response.data.login.token);
      console.log("Profile:", Auth.getProfile());
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "1440px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white" }}>Parent Registration</h2>
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
          Register
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}{" "}
      {/* Display any error messages */}
    </div>
  );
}

export default ParentRegistration;
