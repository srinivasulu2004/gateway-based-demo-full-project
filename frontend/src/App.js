import React, { useState, useEffect } from "react";

function App() {
  const [response, setResponse] = useState("");
  const [users, setUsers] = useState([]);

  const sendRequest = async () => {
    const res = await fetch("/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Srinivas", role: "DevOps" })
    });
    const data = await res.json();
    setResponse(data.message);
    fetchUsers();
  };

  const fetchUsers = async () => {
    const res = await fetch("/user");
    const data = await res.json();
    setUsers(data);
  };

  const getPrediction = async () => {
    const res = await fetch("/predict");
    const data = await res.json();
    alert(data.prediction);
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Full App via Gateway</h1>
      <button onClick={sendRequest}>Add User</button>
      <p>{response}</p>
      <button onClick={getPrediction}>Get AI Prediction</button>
      <h3>All Users:</h3>
      <ul>{users.map(u => <li key={u.id}>{u.name} - {u.role}</li>)}</ul>
    </div>
  );
}

export default App;

