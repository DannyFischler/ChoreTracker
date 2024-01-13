import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background5.jpeg';

const containerStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

const headingStyle = {
  color: 'white',
  fontSize: '2rem',
  marginBottom: '20px',
};

const linkStyle = {
  color: 'white',
  fontSize: '1.2rem',
  textDecoration: 'none',
  margin: '10px',
};

function ParentDashboard() {
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Parent Dashboard</h2>
      <Link to="/createchildaccount" style={linkStyle}>
        Create Child Account
      </Link>
      <Link to="/viewallchores" style={linkStyle}>
        View All Chores
      </Link>
    </div>
  );
}

export default ParentDashboard;

