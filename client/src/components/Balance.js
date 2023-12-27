import React from 'react';
import { useHistory } from 'react-router-dom';

function Balance() {

    const history =useHistory();
    function handleClick() {
        history.push("/transactions");
    }

return(

    <button type="button" onClick={handleClick} className="btn btn-primary KidButton">Balance</button>
)
}


export default Balance