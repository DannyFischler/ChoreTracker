import React from 'react';
import { Link } from 'react-router-dom';

function ParentDashboard() {
  return (
    <div>
      <h2>Parent Dashboard</h2>
      <Link to="/create-child-account">Create Child Account</Link>
      <Link to="/viewallchores">View All Chores</Link>
    </div>
  );
}

export default ParentDashboard;
