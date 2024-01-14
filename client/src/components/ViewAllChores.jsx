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

  const noChoresStyle = Auth.getProfile().parentId !== null
  ? {
      fontSize: "28px",
      color: "darkgreen",
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
                  style={{ fontSize: "15px", color: "black" }}
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
                  onClick={() => updateChore(chore.id)}
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
          <p style={{ color: "darkgreen", fontSize: "18px", fontWeight: "bold" }}>
            Completed Chores total: ${totalAmount.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewAllChores;

