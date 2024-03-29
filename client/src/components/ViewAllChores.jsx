import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_CHORE, DELETE_CHORE, SAVE_CHORE } from "../utils/mutations";
import { GET_MY_CHORES, QUERY_ME } from "../utils/queries";
import backgroundImage from "../assets/background5.jpeg";
import childBackgroundImage from "../assets/doodle-background.jpg";
import Auth from "../utils/auth";

function ViewAllChores() {
  const [date, setDate] = useState("");
  const [newChoreName, setNewChoreName] = useState("");
  const [newChoreAmount, setNewChoreAmount] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedChoreId, setSelectedChoreId] = useState(null);

  const userId =
    Auth.getProfile().parentId == null
      ? Auth.getProfile().userId
      : Auth.getProfile().parentId;

  const { loading, error, data } = useQuery(GET_MY_CHORES, {
    variables: { userId },
  });
  const [updateChoreMutation] = useMutation(UPDATE_CHORE);
  const [deleteChoreMutation] = useMutation(DELETE_CHORE);
  const [saveChoreMutation] = useMutation(SAVE_CHORE);

  useEffect(() => {
    console.log("Data after query:", data);
  }, [loading, data]);

  const openConfirmationModal = (id) => {
    setSelectedChoreId(id);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedChoreId(null);
  };

  const updateChore = () => {
    updateChoreMutation({
      variables: {
        id: selectedChoreId,
        isCompleted: true,
        date_completed: date,
      },
    })
      .then((res) => {
        console.log("Chore updated successfully");
        setIsPopupOpen(true);
      })
      .catch((err) => console.log(err));

    closeConfirmationModal();
  };

  const deleteChore = (id) => {
    deleteChoreMutation({
      variables: {
        id: id,
      },
    })
      .then((res) => {
        console.log("Chore deleted successfully");
        window.location.assign("/viewallchores");
      })
      .catch((err) => console.log(err));
  };

  const saveChore = () => {
    saveChoreMutation({
      variables: {
        chore_name: newChoreName,
        amount: parseFloat(newChoreAmount),
        userId: Auth.getProfile().userId,
      },
      refetchQueries: [GET_MY_CHORES, `userChores`],
    })
      .then((res) => {
        console.log("Chore saved successfully", res);
        setNewChoreName("");
        setNewChoreAmount("");
      })
      .catch((err) => console.log(err));
  };

  const completedChores = data?.userChores.filter((chore) => chore.isCompleted);
  const totalAmount = completedChores?.reduce(
    (sum, chore) => sum + chore.amount,
    0
  );

  const commonStyles = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  };

  const noChoresStyle =
    Auth.getProfile().parentId !== null
      ? {
          fontSize: "28px",
          color: "#274e13",
          fontWeight: "bold",
          ...commonStyles,
        }
      : {
          display: "none",
        };

  return (
    <div
      style={{
        backgroundImage:
          Auth.getProfile().parentId == null
            ? `url(${backgroundImage})`
            : `url(${childBackgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "1440px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <form
          style={{
            marginBottom: "20px",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
            display: Auth.getProfile().parentId == null ? "block" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              value={newChoreName}
              onChange={(e) => setNewChoreName(e.target.value)}
              placeholder="Enter chore name"
              style={{ flex: "1", marginRight: "10px", ...commonStyles }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <input
              type="number"
              value={newChoreAmount}
              onChange={(e) => setNewChoreAmount(e.target.value)}
              placeholder="Enter chore amount"
              style={{ flex: "1", marginRight: "10px", ...commonStyles }}
            />
          </div>
          <button
            type="button"
            onClick={() => saveChore()}
            className="btn btn-warning"
            style={commonStyles}
          >
            Add Chore
          </button>
        </form>

        {loading ? (
          <p style={commonStyles}>Loading...</p>
        ) : error ? (
          <p style={commonStyles}>Error fetching chores</p>
        ) : data && data.userChores.length > 0 ? (
          <div>
            {data.userChores.map((chore) => (
              <div
                key={chore.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <div
                  className="choretxt"
                  style={{ fontSize: "15px", color: "#274e13" }}
                >
                  <b>{chore.chore_name}</b> for: <i>${chore.amount}.00</i>
                  {chore.isCompleted ? (
                    <>
                      <span style={{ marginLeft: "10px", color: "green" }}>
                        {" "}
                        - Completed
                      </span>
                      <div style={{ fontSize: "15px", color: "gray" }}>
                        Date Completed:
                      </div>{" "}
                      <input
                        type="Date"
                        onChange={(e) => setDate(e.target.value)}
                        className="form-control"
                        id="date"
                        style={{ marginBottom: "10px" }}
                      />
                    </>
                  ) : (
                    <span style={{ marginLeft: "10px", color: "red" }}>
                      {" "}
                      - Pending
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => openConfirmationModal(chore.id)}
                  className="btn btn-success"
                  style={{
                    marginRight: "10px",
                    fontSize: "14px",
                    backgroundColor: "lightgreen",
                    borderColor: "green",
                  }}
                >
                  ✔ Chore Complete!
                </button>
                <button
                  type="button"
                  onClick={() => deleteChore(chore.id)}
                  className="btn btn-danger"
                  style={{
                    fontSize: "15px",
                    backgroundColor: "lightcoral",
                    borderColor: "darkred",
                    display:
                      Auth.getProfile().parentId == null ? "block" : "none",
                  }}
                >
                  Delete Chore
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={noChoresStyle}>No chores. Take a break!</p>
        )}

        {totalAmount > 0 && (
          <p style={{ color: "#274e13", fontSize: "18px", fontWeight: "bold" }}>
            Completed chores total: ${totalAmount.toFixed(2)}
          </p>
        )}

        {/* Pop-up Modal */}
        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        <div
          style={{
            display: showConfirmationModal ? "block" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#b6d7a8',
              color: '#274e13', 
              width: '300px',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <p>Are you sure you completed this chore?</p>
            <button onClick={updateChore}>Yes!</button>
            <span style={{ margin: '0 5px' }}></span> 
            <button onClick={closeConfirmationModal}>Not yet!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllChores;
