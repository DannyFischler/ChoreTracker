import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CHORES, UPDATE_CHORE, DELETE_CHORE, ADD_CHORE, SAVE_CHORE } from '../utils/mutations'; 
import { GET_CHORES as GET_CHORES_QUERY, QUERY_ME } from '../utils/queries';

function ViewAllChores() {
  const [date, setDate] = useState('');
  const [newChoreName, setNewChoreName] = useState('');
  const [newChoreAmount, setNewChoreAmount] = useState('');
  
  const { loading, error, data } = useQuery(GET_CHORES_QUERY);
  const [updateChoreMutation] = useMutation(UPDATE_CHORE);
  const [deleteChoreMutation] = useMutation(DELETE_CHORE);
  const [addChoreMutation] = useMutation(ADD_CHORE); 
  const [saveChoreMutation] = useMutation(SAVE_CHORE);

  useEffect(() => {
  }, [loading, data]);

  const updateChore = (chores_id) => {
    updateChoreMutation({
      variables: {
        id: chores_id,
        date_approved: null, 
        date_completed: date,
        parent_comments: null,
        child_comments: null,
      },
    })
      .then((res) => {
        console.log("Chore updated successfully");
      })
      .catch((err) => console.log(err));
  };

  const deleteChore = (chores_id) => {
    deleteChoreMutation({
      variables: {
        id: chores_id,
      },
    })
    .then((res) => {
      console.log("Chore deleted successfully");
    })
    .catch((err) => console.log(err));
  };

  const addChore = () => {
    addChoreMutation({
      variables: {
        parent_id: 1, 
        chore_name: newChoreName,
        amount: parseFloat(newChoreAmount),
      },
      refetchQueries: [{ query: GET_CHORES }], 
    })
      .then((res) => {
        console.log("Chore added successfully");
        setNewChoreName('');
        setNewChoreAmount('');
      })
      .catch((err) => console.log(err));
  };
  const saveChore = (chores_id) => {
    saveChoreMutation({
      variables: {
        id: chores_id,
        date_approved: date,
        date_completed: null,
        parent_comments: null,
        child_comments: null,
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
          <input
            type="text"
            value={newChoreName}
            onChange={(e) => setNewChoreName(e.target.value)}
          />

          <label>New Chore Amount:</label>
          <input
            type="number"
            value={newChoreAmount}
            onChange={(e) => setNewChoreAmount(e.target.value)}
          />

          <button type="button" onClick={addChore} className="btn btn-primary">
            Add Chore
          </button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching chores</p>
        ) : data && data.chores.length > 0 ? (
          <div>
            {data.chores.map((chore) => (
              <div key={chore.chores_id}>
                <h6 className="choretxt">
                  <b>{chore.chore_name}</b> for: <i>${chore.amount}.00</i>
                </h6>
                <h6>Date Completed:</h6>
                <input
                  type="Date"
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                  id="date"
                ></input>
                <button
                  type="button"
                  onClick={() => updateChore(chore.chores_id)}
                  className="btn btn-success"
                >
                  ✔ Chore Complete!
                </button>
                <button
                  type="button"
                  onClick={() => deleteChore(chore.chores_id)}
                  className="btn btn-danger"
                >
                  Delete Chore
                </button>
                <button
                  type="button"
                  onClick={() => saveChore(chore.chores_id)}
                  className="btn btn-warning"
                >
                  Save Chore
                </button>
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