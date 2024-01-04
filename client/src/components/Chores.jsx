import React from 'react';
import { useNavigate } from 'react-router-dom';

function Chores() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/viewallchores");
  }

  return (
    <div>
      <h2>Chores</h2>
      <button className="btn btn-success" onClick={() => navigate("/")}>
        Log Out
      </button>
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-primary KidButton"
      >
        View Chores
      </button>
    </div>
  );
}

export default Chores;
