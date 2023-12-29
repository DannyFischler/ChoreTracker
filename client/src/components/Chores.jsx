import React from 'react';
import { useHistory } from 'react-router-dom';

function Chores() {
    const history = useHistory();

    function handleClick() {
        history.push("/viewallchores");

    }
    return(

    <button type="button" onClick={handleClick} class="btn btn-primary KidButton">View Chores</button>
    )
}

export default Chores