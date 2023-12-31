import React from 'react';
import Balance from '../Balance';
import Chores from '../Chores';
import { Link } from 'react-router-dom';

function ChildDashboard() {
  return (
    <div>
      <h2>Child Dashboard</h2>
      <Link to="/">
        <button className="btn btn-success">Log Out</button>
      </Link>

      <div>
        <div className="row">
          <Balance />
        </div>
      </div>
      <div className="row">
        <Chores />
      </div>
    </div>
  );
}

export default ChildDashboard;
