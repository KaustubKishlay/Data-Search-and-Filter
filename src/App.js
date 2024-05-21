import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (filterOption === "1") {
      return a.name.localeCompare(b.name);
    } else if (filterOption === "2") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="container">
      <h1>User Filter and Search App</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
      >
        <option value="">All</option>
        <option value="1">Name A-Z</option>
        <option value="2">Name Z-A</option>
      </select>

      <div id="usersList">
        {sortedUsers.map((user) => (
          <div key={user.id} className="user">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            {/* <p>Address:{user.address}</p> */}
            <p>Company: {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
