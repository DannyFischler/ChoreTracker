import React from 'react';
import { useHistory } from 'react-router-dom';

function Balance() {
  let history = useHistory();

  const handleClick = () => {
    history.push('/transactions');
  };

  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary KidButton">
        View Transactions
      </button>
    </div>
  );
}

export default Balance;
