import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import backgroundImage from "../assets/background5.jpeg";

function CreateChildAccount() {
  const parent = Auth.getProfile();
  const [username, setChildUsername] = useState("");
  const [password, setChildPassword] = useState("");
  const parentId = Auth.getProfile().userId;
  const [register, { data, loading, error }] = useMutation(ADD_USER);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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
      <h2 style={{ color: "white" }}>Create Child Account</h2>
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
          onChange={(e) => setChildUsername(e.target.value)}
          placeholder="Child's Username"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setChildPassword(e.target.value)}
          placeholder="Child's Password"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Create Account
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {isPopupOpen && !error && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 100, 0, 0.9)', 
            color: 'white', 
            width: '300px',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          <p>Child account created successfully!</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default CreateChildAccount;
