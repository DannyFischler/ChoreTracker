import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_CHORE, DELETE_CHORE, SAVE_CHORE } from '../utils/mutations'; 
import { GET_CHORES, QUERY_ME } from '../utils/queries';
import backgroundImage from '../assets/background5.jpeg'; 

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
        date_completed: date,
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

  const saveChore = () => {
    saveChoreMutation({
      variables: {
        chore_name: newChoreName,
        amount: parseFloat(newChoreAmount),
      },
      refetchQueries: [{ query: GET_CHORES }],
    })
      .then((res) => {
        console.log("Chore saved successfully");
        setNewChoreName('');
        setNewChoreAmount('');
      })
      .catch((err) => console.log(err));
  };

  const commonStyles = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
  };

  const noChoresStyle = {
    fontSize: '28px', 
    color: 'white',
    fontWeight: 'bold',
    ...commonStyles,
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', width: '1440px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        {/* <h4 style={{ marginBottom: '20px', color: 'white' }}>Mark Chores Complete</h4> */}
        <form style={{ marginBottom: '20px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
            <input type="text" value={newChoreName} onChange={(e) => setNewChoreName(e.target.value)} placeholder="Enter chore name" style={{ flex: '1', marginRight: '10px', ...commonStyles }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
            <input type="number" value={newChoreAmount} onChange={(e) => setNewChoreAmount(e.target.value)} placeholder="Enter chore amount" style={{ flex: '1', marginRight: '10px', ...commonStyles }} />
          </div>
          <button type="button" onClick={() => saveChore()} className="btn btn-warning" style={commonStyles}>Add Chore</button>
        </form>

        {loading ? (
          <p style={commonStyles}>Loading...</p>
        ) : error ? (
          <p style={commonStyles}>Error fetching chores</p>
        ) : data && data.chores.length > 0 ? (
          <div>
            {data.chores.map((chore) => (
              <div key={chore.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <h6 className="choretxt" style={{ fontSize: '15px', color: 'white' }}>
                  <b>{chore.chore_name}</b> for: <i>${chore.amount}.00</i>
                  {chore.isCompleted ? (
                    <>
                      <span style={{ marginLeft: '10px', color: 'green' }}> - Completed</span>
                      <h6 style={{ fontSize: '15px', color: 'gray' }}>Date Completed:</h6>
                      <input type="Date" onChange={(e) => setDate(e.target.value)} className="form-control" id="date" style={{ marginBottom: '10px' }} />
                    </>
                  ) : (
                    <span style={{ marginLeft: '10px', color: 'red' }}> - Pending</span>
                  )}
                </h6>
                <button type="button" onClick={() => updateChore(chore.id)} className="btn btn-success" style={{ marginRight: '10px', fontSize: '14px', backgroundColor: 'lightgreen', borderColor: 'green' }}>✔ Chore Complete!</button>
                <button type="button" onClick={() => deleteChore(chore.id)} className="btn btn-danger" style={{ fontSize: '15px', backgroundColor: 'lightcoral', borderColor: 'darkred' }}>Delete Chore</button>
              </div>
            ))}
          </div>
        ) : (
          <p style={noChoresStyle}>No chores. Take a break!</p>
        )}
      </div>
    </div>
  );
}

export default ViewAllChores;
