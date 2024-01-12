// Welcome.jsx
import React from 'react';
import backgroundImage from '../assets/background5.jpeg';

const Welcome = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'black',
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
    fontSize: '9em',
    color: '#274e13', 
    fontFamily: 'cursive', 
  fontStyle: 'italic',
  };
  
  const paragraphStyle = {
    fontSize: '2.5em',
    color: 'white',
    fontFamily: 'serif',
    fontStyle: 'italic',
  };

  const imageStyle = {
    width: '1440px', 
    height: 'auto',
    marginBottom: '20px',
    margin: '0 auto', 
  };

  return (
    <div style={containerStyle}>
      {/* <img src={logo} alt="Chore Tracker Logo" style={imageStyle} /> */}
      <h1 style={headingStyle}>Chore Tracker</h1>
      <p style={paragraphStyle}>To help make chores a little bit easier                                                            </p>
    </div>
  );
};

export default Welcome;
