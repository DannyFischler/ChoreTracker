// Welcome.jsx
import React from 'react';
import logo from '../assets/logo3.jpeg';
import backgroundImage from '../assets/background.jpeg';

const Welcome = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: '100vh', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',  
  };

  const headingStyle = {
    fontSize: '3em',
    color: 'light blue',
    fontFamily: 'sans-serif', 
  };

  const paragraphStyle = {
    fontSize: '2.2em',
    color: 'light blue', 
    fontFamily: 'sans-serif',  
  };

  const imageStyle = {
    width: '500px', 
    height: 'auto',
    marginBottom: '20px',
    margin: '0 auto', 
  };

  return (
    <div style={containerStyle}>
      <img src={logo} alt="Chore Tracker Logo" style={imageStyle} />
      {/* <h1 style={headingStyle}>Chore Tracker</h1> */}
      <p style={paragraphStyle}>Taking the work out of creating chores while making financial education both engaging and accessible for children.</p>
    </div>
  );
};

export default Welcome;
