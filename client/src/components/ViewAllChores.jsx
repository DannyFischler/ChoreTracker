import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_CHORE, DELETE_CHORE, SAVE_CHORE } from '../utils/mutations'; 
import { GET_CHORES , QUERY_ME } from '../utils/queries';

function ViewAllChores() {
  const [date, setDate] = useState('');
  const [newChoreName, setNewChoreName] = useState('');
  const [newChoreAmount, setNewChoreAmount] = useState('');
  
  const { loading, error, data } = useQuery(GET_CHORES);
  const [updateChoreMutation] = useMutation(UPDATE_CHORE);
  const [deleteChoreMutation] = useMutation(DELETE_CHORE);
  const [saveChoreMutation] = useMutation(SAVE_CHORE);

  useEffect(() => {
    console.log("Data after query:", data);
  }, [loading, data]);

  const updateChore = (id) => {
    updateChoreMutation({
      variables: {
        id: id,
        isCompleted: true,
        date_completed: date 
      },
    })
    .then((res) => {
      console.log("Chore updated successfully");
    })
    .catch((err) => console.log(err));
  };
  
  const deleteChore = (id) => {
    deleteChoreMutation({
      variables: {
        id: id,
      },
    })
    .then((res) => {
      console.log("Chore deleted successfully");
    })
    .catch((err) => console.log(err));
  };

  const saveChore = (id) => {
    saveChoreMutation({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_CHORES }],
    })
      .then((res) => {
        console.log("Chore saved successfully");
        setDate('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="childContainer">
      <div className="container">
        <h4>Mark Chores Complete</h4>
        <form>
          <label>New Chore Name:</label>
          <input type="text" value={newChoreName} onChange={(e) => setNewChoreName(e.target.value)} />
          <label>New Chore Amount:</label>
          <input type="number" value={newChoreAmount} onChange={(e) => setNewChoreAmount(e.target.value)} />
          <button type="button" onClick={() => saveChore()} className="btn btn-warning">Save Chore</button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching chores</p>
        ) : data && data.chores.length > 0 ? (
          <div>
            {data.chores.map((chore) => (
              <div key={chore.id}>
                <h6 className="choretxt">
                  <b>{chore.chore_name}</b> for: <i>${chore.amount}.00</i>
                  {chore.isCompleted ? <span> - Completed</span> : <span> - Pending</span>}
                </h6>
                <h6>Date Completed:</h6>
                <input type="Date" onChange={(e) => setDate(e.target.value)} className="form-control" id="date" />
                <button type="button" onClick={() => updateChore(chore.id)} className="btn btn-success">✔ Chore Complete!</button>
                <button type="button" onClick={() => deleteChore(chore.id)} className="btn btn-danger">Delete Chore</button>
                <button type="button" onClick={() => saveChore(chore.id)} className="btn btn-warning">Save Chore</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No chores. Take a break!</p>
        )}
      </div>
    </div>
  );
}

export default ViewAllChores;
