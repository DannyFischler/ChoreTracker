import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background5.jpeg';

function ParentDashboard() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', width: '1440px', }}>
      <h2 style={{ color: 'white' }}>Parent Dashboard</h2>
      <Link to="/create-child-account" style={{ color: 'white' }}>Create Child Account</Link>
      <Link to="/viewallchores" style={{ color: 'white' }}>View All Chores</Link>
    </div>
  );
}

export default ParentDashboard;
